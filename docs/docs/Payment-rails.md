## UBeU Payment Gateway Strategy

**Overview**

UBeU implements a hybrid payment gateway strategy to support seamless fiat-to-crypto onboarding, emphasizing zero-friction user experience while abstracting blockchain complexities. The system integrates two primary gateways: Alchemy Pay for fiat ramping and NOWPayments for crypto-native processing. This dual approach ensures global coverage, multi-currency support, and compliance with UBeU's treasury-sponsored fee model, where users pay in preferred currencies ($20/year base) and treasury handles Hedera network fees.

**Key Objectives**

- Accessibility: Enable Web2 users to pay via credit cards/bank transfers; Web3 users via crypto wallets.
- Cost Efficiency: Minimize fees (target <2% processing) with treasury absorbing Hedera tinybar conversions via Exchange Rate precompile (0x168).
- Compliance & Security: KYC/AML integration, PCI-DSS compliance, and fraud detection for GDPR/CCPA alignment.
- Scalability: Handle 1M+ annual registrations with auto-scaling and failover.
- Integration: Backend hooks in RegistryCoordinationServiceImpl.ts for payment validation (e.g., validatePaymentProof) and tracking in network_spend table.

**Selected Gateways**

*Alchemy Pay*
- Role: Primary fiat on-ramp for USD/EUR/GBP payments, converting to USDC on Hedera (0x000000000000000000000000000000000006fbBA).
- Features:
    - Supports 50+ fiat currencies, cards (Visa/Mastercard), and bank transfers.
    - Instant settlements with low fees (1-2%).
    - Built-in KYC for high-value transactions (> $100).
    - Webhook callbacks for real-time confirmation in TreasuryService.


Implementation:

User flow: Redirect to Alchemy checkout; callback updates payment_transactions table.
Cost: Base $20/year; additional for multi-term (3/5/10 years).
Fallback: Auto-retry on failure; log to HCS audit trails.



NOWPayments

Role: Crypto payment processor for BTC/ETH/USDT inflows, bridging to Hedera USDC.
Features:

100+ cryptos supported with instant conversions.
Low fees (0.5-1%) and invoice-based API for wallet integrations.
Custodial/non-custodial options; IPN (Instant Payment Notifications) for status updates.
No KYC required for small amounts, aligning with Web3 zero-friction.


Implementation:

User flow: Generate invoice in backend; poll/notify updates in payment_transactions.
Handles volatility with 10-min price locks.
Integration: TreasuryService tracks conversions via Exchange Rate precompile for USD-cent accuracy.



Risk Mitigation & Monitoring

Redundancy: Alchemy as primary; NOWPayments as backup for fiat/crypto overlap.
Analytics: Track conversions in analytics_events; monitor fees via PostgreSQL queries.
Testing: Hedera testnet simulations for end-to-end flows.
Future Enhancements: Add Stripe for EU expansion; integrate PRNG (0x169) for secure invoice IDs.

This strategy ensures UBeU's $2 annual allowance resets seamlessly post-payment, maintaining treasury sponsorship for all Hedera operations.