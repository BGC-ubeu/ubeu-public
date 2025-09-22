# LMS Integration with UBeU

This guide demonstrates how to integrate UBeU with Learning Management Systems (LMS) like Moodle, Canvas, and Google Classroom to automatically issue Open Badges for course completions.

## 🎯 Overview

LMS integration enables:
- **Automatic Badge Issuance** - Issue badges when students complete courses
- **Real-time Sync** - Sync completion data with UBeU
- **Bulk Operations** - Handle large numbers of students efficiently
- **Privacy Compliance** - GDPR/CCPA compliant data handling

## 🏗️ Architecture

```
LMS Platform → UBeU API → Hedera Network
     ↓              ↓
Student Portal ← Webhook ← Credential Storage
```

## 📋 Prerequisites

1. **UBeU Enterprise Account** with API access
2. **LMS Admin Access** for webhook configuration
3. **DID Setup** for your institution

## 🔧 Setup Steps

### 1. Configure UBeU Enterprise Account

```javascript
import { UBeUClient } from '@ubeu/sdk';

// Initialize enterprise client
const client = new UBeUClient({
  apiKey: process.env.UBEU_API_KEY,
  environment: 'production'
});

// Register your institution
const enterprise = await client.enterprises.register({
  organizationName: 'University of Example',
  parentDomain: 'example.edu',
  enterpriseTier: 'pro'
});

console.log('Enterprise DID:', enterprise.managedDid);
```

### 2. Set Up Webhooks

```javascript
// Configure webhook for course completions
const webhook = await client.webhooks.create({
  url: 'https://your-lms.com/webhooks/ubeu',
  events: ['course.completed', 'badge.issued'],
  secret: process.env.WEBHOOK_SECRET
});
```

### 3. Create Badge Templates

```javascript
// Define badge templates for different course types
const badgeTemplates = {
  undergraduate: {
    name: 'Undergraduate Course Completion',
    description: 'Successfully completed an undergraduate course',
    criteria: 'Completed all assignments and assessments with passing grade',
    image: 'https://example.edu/badges/undergraduate.png'
  },
  graduate: {
    name: 'Graduate Course Completion',
    description: 'Successfully completed a graduate-level course',
    criteria: 'Completed all requirements with B+ or higher',
    image: 'https://example.edu/badges/graduate.png'
  }
};
```

## 💻 Implementation Examples

### Moodle Integration

```php
<?php
// Moodle completion handler
class UBeU_Badge_Issuer {

    private $ubeuClient;
    private $badgeTemplates;

    public function __construct() {
        $this->ubeuClient = new UBeUClient([
            'api_key' => get_config('ubeu', 'api_key'),
            'environment' => 'production'
        ]);
    }

    // Called when course is completed
    public function issue_course_badge($course, $user) {
        try {
            // Get student DID (from user profile or external mapping)
            $studentDid = $this->get_student_did($user);

            // Determine badge type
            $badgeType = $this->determine_badge_type($course);

            // Issue badge via UBeU
            $badge = $this->ubeuClient->badges->issue([
                'recipientDid' => $studentDid,
                'achievement' => [
                    'id' => "urn:uuid:{$course->id}-{$user->id}",
                    'type' => 'Achievement',
                    'name' => $course->fullname,
                    'description' => $course->summary,
                    'criteria' => [
                        'narrative' => 'Completed all course requirements'
                    ]
                ],
                'issuerDid' => $this->get_institution_did(),
                'evidence' => [
                    [
                        'id' => moodle_url('/course/view.php', ['id' => $course->id]),
                        'narrative' => 'Official course completion record',
                        'name' => 'Course Transcript'
                    ]
                ]
            ]);

            // Store badge ID in Moodle user profile
            $this->store_badge_reference($user->id, $badge->id);

            return $badge;

        } catch (Exception $e) {
            debugging("UBeU badge issuance failed: " . $e->getMessage());
            return false;
        }
    }

    private function get_student_did($user) {
        // Check if user has DID in profile
        $did = get_user_field($user->id, 'ubeu_did');
        if ($did) {
            return $did;
        }

        // Create new identity for student
        $identity = $this->ubeuClient->identities->create([
            'email' => $user->email,
            'domain' => $this->generate_student_domain($user)
        ]);

        // Store DID in user profile
        set_user_field($user->id, 'ubeu_did', $identity->did);

        return $identity->did;
    }
}
```

### Canvas Integration

```javascript
// Canvas course completion webhook handler
const express = require('express');
const { UBeUClient } = require('@ubeu/sdk');

const app = express();
const ubeuClient = new UBeUClient({
  apiKey: process.env.CANVAS_UBEU_API_KEY,
  environment: 'production'
});

// Handle Canvas course completion webhook
app.post('/webhooks/canvas/course-completed', async (req, res) => {
  try {
    const { user_id, course_id, completed_at, grade } = req.body;

    // Get user details from Canvas
    const userDetails = await getCanvasUser(user_id);
    const courseDetails = await getCanvasCourse(course_id);

    // Issue badge
    const badge = await ubeuClient.badges.issue({
      recipientDid: userDetails.ubeuDid,
      achievement: {
        id: `urn:uuid:canvas-${course_id}-${user_id}`,
        type: 'Achievement',
        name: courseDetails.name,
        description: `Successfully completed ${courseDetails.name}`,
        criteria: {
          narrative: `Achieved grade: ${grade}%`
        }
      },
      issuerDid: process.env.INSTITUTION_DID,
      evidence: [{
        id: `https://canvas.institution.edu/courses/${course_id}`,
        narrative: 'Official Canvas course completion record',
        name: 'Course Completion Certificate'
      }]
    });

    // Update user profile with badge
    await updateCanvasUserProfile(user_id, {
      ubeuBadgeId: badge.id,
      completionDate: completed_at
    });

    res.status(200).json({ success: true, badgeId: badge.id });

  } catch (error) {
    console.error('Badge issuance failed:', error);
    res.status(500).json({ error: 'Badge issuance failed' });
  }
});
```

### Google Classroom Integration

```javascript
// Google Classroom course completion handler
const { google } = require('googleapis');
const { UBeUClient } = require('@ubeu/sdk');

class GoogleClassroomIntegration {

  constructor() {
    this.classroom = google.classroom({ version: 'v1' });
    this.ubeuClient = new UBeUClient({
      apiKey: process.env.UBEU_API_KEY,
      environment: 'production'
    });
  }

  // Monitor course work submissions
  async monitorSubmissions(courseId) {
    const submissions = await this.classroom.courses.courseWork.studentSubmissions.list({
      courseId: courseId,
      courseWorkId: '-'
    });

    for (const submission of submissions.data.studentSubmissions) {
      if (this.isCourseCompleted(submission)) {
        await this.issueCompletionBadge(submission, courseId);
      }
    }
  }

  // Issue badge for course completion
  async issueCompletionBadge(submission, courseId) {
    const student = await this.getStudentDetails(submission.userId);
    const course = await this.getCourseDetails(courseId);

    const badge = await this.ubeuClient.badges.issue({
      recipientDid: student.ubeuDid,
      achievement: {
        id: `urn:uuid:gclass-${courseId}-${submission.userId}`,
        type: 'Achievement',
        name: `${course.name} Completion`,
        description: `Successfully completed ${course.name} on Google Classroom`,
        criteria: {
          narrative: 'Completed all assignments and received passing grade'
        }
      },
      issuerDid: process.env.INSTITUTION_DID,
      evidence: [{
        id: `https://classroom.google.com/c/${courseId}`,
        narrative: 'Google Classroom course completion record',
        name: 'Course Certificate'
      }]
    });

    // Store badge reference
    await this.storeBadgeReference(submission.userId, badge.id);
  }
}
```

## 🔄 Real-time Sync

### Webhook Configuration

```javascript
// Set up real-time sync webhooks
const syncConfig = {
  lmsType: 'moodle',
  baseUrl: 'https://moodle.university.edu',
  webhooks: {
    courseCompleted: {
      url: 'https://ubeu-sync.university.edu/webhooks/course-completed',
      events: ['course_completed'],
      secret: process.env.WEBHOOK_SECRET
    },
    gradeUpdated: {
      url: 'https://ubeu-sync.university.edu/webhooks/grade-updated',
      events: ['grade_updated'],
      secret: process.env.WEBHOOK_SECRET
    }
  }
};

// Register webhooks with UBeU
await ubeuClient.webhooks.register(syncConfig);
```

### Bulk Badge Issuance

```javascript
// Handle bulk operations for semester end
async function issueSemesterBadges(completions) {
  const batches = chunkArray(completions, 100); // Process in batches

  for (const batch of batches) {
    const badgePromises = batch.map(completion =>
      ubeuClient.badges.issue({
        recipientDid: completion.studentDid,
        achievement: {
          id: `urn:uuid:semester-${completion.courseId}-${completion.studentId}`,
          type: 'Achievement',
          name: completion.courseName,
          description: `Completed ${completion.courseName} with grade ${completion.grade}`
        },
        issuerDid: process.env.INSTITUTION_DID
      })
    );

    // Wait for batch to complete
    await Promise.all(badgePromises);

    // Rate limiting pause
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

## 📊 Analytics and Reporting

### Badge Issuance Analytics

```javascript
// Get badge analytics
const analytics = await ubeuClient.analytics.getBadgeStats({
  institutionDid: process.env.INSTITUTION_DID,
  dateRange: {
    start: '2025-01-01',
    end: '2025-12-31'
  }
});

console.log('Badges issued this year:', analytics.totalIssued);
console.log('Most popular courses:', analytics.topCourses);
```

### Student Progress Tracking

```javascript
// Track student badge collection
const studentProgress = await ubeuClient.students.getProgress(studentDid);

console.log('Total badges earned:', studentProgress.totalBadges);
console.log('Courses completed:', studentProgress.completedCourses);
console.log('Skills demonstrated:', studentProgress.skills);
```

## 🔒 Security Considerations

### Data Privacy
- **Student Consent** - Always obtain consent before issuing badges
- **Data Minimization** - Only store necessary student information
- **Right to Delete** - Support credential revocation and data deletion

### Authentication
- **Secure API Keys** - Use environment variables, never hardcode
- **Webhook Verification** - Verify webhook signatures
- **Rate Limiting** - Implement appropriate rate limits

## 🧪 Testing

### Unit Tests
```javascript
describe('LMS Integration', () => {
  test('should issue badge on course completion', async () => {
    const mockCompletion = {
      studentId: '123',
      courseId: '456',
      grade: 'A'
    };

    const badge = await lmsIntegration.issueBadge(mockCompletion);

    expect(badge).toBeDefined();
    expect(badge.recipientDid).toBe(mockCompletion.studentDid);
  });
});
```

### Integration Tests
```javascript
describe('End-to-End LMS Flow', () => {
  test('should handle full course completion workflow', async () => {
    // 1. Create student identity
    const student = await createTestStudent();

    // 2. Simulate course completion
    await simulateCourseCompletion(student.id, 'CS101');

    // 3. Verify badge was issued
    const badges = await ubeuClient.badges.getByRecipient(student.did);
    expect(badges).toContainEqual(
      expect.objectContaining({
        achievement: expect.objectContaining({
          name: 'CS101 Completion'
        })
      })
    );
  });
});
```

## 🚀 Deployment

### Docker Configuration
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lms-ubeu-integration
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: integration
        image: your-registry/lms-ubeu-integration:latest
        env:
        - name: UBEU_API_KEY
          valueFrom:
            secretKeyRef:
              name: ubeu-secrets
              key: api-key
```

## 📞 Support

For LMS integration support:
- **📧 Email**: integrations@ubeu.io
- **📚 Docs**: [docs.ubeu.io/lms-integration](https://docs.ubeu.io/lms-integration)
- **💬 Slack**: #lms-integration

---

**Ready to integrate UBeU with your LMS?** Contact our integration team!