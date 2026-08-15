# ADR 001: Database Engine Selection

## Decision
We selected **PostgreSQL** as our primary relational database engine.

## Rationale
1. **Data Integrity:** Relational databases natively support strong integrity constraints (e.g., UNIQUE, CHECK, DEFAULT, Foreign Keys).
2. **Complex Views:** It handles complex JOIN operations and aggregation functions efficiently, which are required for the business intelligence reports (Criterion 1.5).
3. **Reliability:** Postgres is ACID compliant, ensuring that transactions (like creating a user and logging the action) either completely succeed or fail, maintaining a consistent state.

## Consequences
- Requires strict schema definitions, which adds initial development overhead compared to NoSQL alternatives.
- Requires mapping libraries (TypeORM) to bridge the object-relational gap in our Node.js backend.
