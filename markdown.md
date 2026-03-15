# CannaTrack Backend Feature Architecture

## Purpose

CannaTrack is an end-to-end cultivator management platform for licensed cultivation operations. The backend should be organized around business features rather than generic technical layers so that each domain can evolve independently while still working as one connected operational system.

The backend exists to support:
- cultivation tracking
- inventory management
- compliance reporting
- team management
- analytics and operational visibility
- complete seed-to-sale traceability

## Product Goal

The platform should give operators, managers, and compliance teams one shared system of record for daily cultivation activity. Every important event in the operation should be captured once, linked to the relevant entities, and then reused across workflows, reporting, alerts, and analytics.

## Feature-Driven Architecture Principles

The backend should be structured by feature domain. Each feature owns its business rules, workflows, validations, and data responsibilities.

Instead of building around generic folders like controllers, services, and repositories only, the backend should be organized around business capabilities such as:
- authentication and access
- facilities and rooms
- cultivation lifecycle
- inventory and materials
- task operations
- compliance and audit trail
- team and workforce management
- analytics and reporting
- notifications and alerts

This keeps the system aligned with how the business actually operates.

## High-Level Business Domains

### 1. Identity and Access

This feature controls who can enter the system, what facility they belong to, and what they are allowed to do.

Core responsibilities:
- sign in and sign out
- session management
- password and credential management
- role assignment
- permission enforcement
- facility-level access restrictions
- user status management

How it links to the rest of the system:
- every action in cultivation, inventory, compliance, and reporting is tied to an authenticated user
- permissions determine which workflows a person can perform
- audit history uses identity data to show who did what and when

Key roles:
- owner or executive
- facility manager
- cultivation manager
- compliance manager
- inventory manager
- operator or technician
- viewer or auditor

### 2. Organization, Facilities, and Locations

This feature models the business structure and physical layout of the cultivation operation.

Core responsibilities:
- organization profile
- facility management
- rooms, zones, benches, vaults, drying rooms, and storage areas
- room status and capacity
- environmental grouping
- location hierarchy

How it links to the rest of the system:
- plants, inventory, tasks, and compliance events must always belong to a location
- analytics are grouped by facility and room
- permissions may be scoped to one or more facilities

### 3. Cultivation Lifecycle Management

This is the core operational feature for managing plants from propagation through harvest.

Core responsibilities:
- strain and cultivar catalog
- genetics and mother plant records
- propagation batches
- plant batch creation
- lifecycle stage tracking
- room assignment and movement
- watering, feeding, treatment, and inspection records
- plant counts and loss tracking
- harvest planning and execution
- waste and destruction records

Lifecycle stages may include:
- genetics or mother stock
- propagation
- vegetative growth
- flowering
- harvest
- drying
- curing
- finished goods or transfer out

How it links to the rest of the system:
- consumes inventory such as nutrients, media, packaging, and supplies
- creates tasks for operators
- produces compliance records automatically
- feeds analytics on yield, loss, and room performance
- connects harvest output into post-harvest and inventory workflows

### 4. Inventory and Materials Management

This feature tracks everything the facility buys, stores, consumes, produces, and transfers.

Core responsibilities:
- seed and genetics inventory
- cultivation inputs such as nutrients, media, additives, pesticides, and tools
- packaging and supplies
- harvested material inventory
- finished goods inventory
- lot and batch tracking
- stock adjustments
- storage location tracking
- receiving and internal transfers
- expiration and usage monitoring

How it links to the rest of the system:
- cultivation activities consume inventory
- harvest events create inventory lots
- compliance reporting needs lot traceability
- analytics use inventory movement to understand waste, efficiency, and cost behavior

### 5. Task and Operations Management

This feature turns operational plans into daily executable work.

Core responsibilities:
- recurring task scheduling
- room-based task assignment
- standard operating procedure tasks
- ad hoc task creation
- checklists and work instructions
- due dates, priorities, and escalations
- task completion records
- shift-level operational handoff

Typical tasks:
- watering
- feeding
- pruning
- scouting
- transplanting
- cleaning and sanitation
- count verification
- harvest prep
- packaging prep
- compliance checks

How it links to the rest of the system:
- tasks attach to rooms, plant batches, inventory lots, or compliance events
- task completion updates operational status
- analytics track labor productivity and completion rates
- compliance can require proof that tasks were completed correctly

### 6. Compliance and Regulatory Management

This feature ensures the operation stays inspection ready and maintains traceable records.

Core responsibilities:
- regulatory event logging
- plant and inventory traceability
- movement logs
- destruction and waste records
- audit trail generation
- compliance checklist management
- report preparation
- exception tracking
- inspection support
- required document storage references

How it links to the rest of the system:
- receives data from cultivation, inventory, and task workflows
- stores the official operational record for audits
- provides historical reconstruction of key events
- supports external reporting requirements where needed

Important principle:
compliance should not be a separate afterthought. It should be generated naturally from operational workflows so teams do not have to recreate history later.

### 7. Team and Workforce Management

This feature manages the people doing the work and their accountability.

Core responsibilities:
- employee and user profiles
- team structure
- role assignment
- shift association
- training or certification status
- task ownership
- action accountability
- activity history by user

How it links to the rest of the system:
- tasks are assigned to team members
- compliance records show who performed or approved work
- managers use team data to review execution quality and capacity

### 8. Analytics and Operational Insights

This feature turns operational records into decision support.

Core responsibilities:
- dashboard summaries
- room performance trends
- yield tracking
- task completion metrics
- inventory usage patterns
- loss and waste analysis
- compliance health indicators
- exception and bottleneck visibility
- management reporting views

Typical business questions it should answer:
- which rooms are underperforming
- where plant loss is increasing
- which tasks are repeatedly overdue
- which inputs are consumed fastest
- where documentation is incomplete
- how harvest output compares across strains or rooms

How it links to the rest of the system:
- aggregates data from cultivation, inventory, tasks, compliance, and team activity
- should not be the system of record itself
- should rely on the operational features for source truth

### 9. Notifications, Alerts, and Exceptions

This feature highlights what needs attention now.

Core responsibilities:
- overdue task alerts
- missing documentation alerts
- environmental threshold alerts if integrated later
- inventory shortage warnings
- expiring or aging stock warnings
- unresolved compliance issue alerts
- failed workflow or approval alerts

How it links to the rest of the system:
- triggered by business rules from other features
- delivered to the right people based on role and facility
- reduces operational delays and compliance risk

### 10. Reporting and Exports

This feature creates formal outputs for internal management and external needs.

Core responsibilities:
- operational summaries
- compliance reports
- inventory movement reports
- harvest and yield reports
- task completion reports
- user activity reports
- audit-ready export packages
- scheduled reports for managers

How it links to the rest of the system:
- reporting is composed from existing feature data
- reports should reuse trusted operational records
- exported outputs must preserve traceability and context

## End-to-End Workflow Model

### Seed to Sale Flow

The app should support a connected lifecycle:

1. genetics or seeds are registered
2. propagation batches are created
3. plants move into vegetative and flowering stages
4. operators perform scheduled room work
5. every major action is logged against plants, rooms, and users
6. inventory is consumed during cultivation
7. harvest events create output lots
8. post-harvest handling updates storage and inventory records
9. compliance records are generated from the same operational events
10. analytics and reports summarize the outcomes for management

This creates one continuous chain of traceability.

## Cross-Feature Shared Concepts

Several business concepts should be shared consistently across all domains.

### Shared Core Entities
- organization
- facility
- room or location
- user
- role
- plant or plant batch
- strain or cultivar
- task
- inventory item
- inventory lot
- operational event
- compliance event
- report

### Shared Behaviors
- status tracking
- timestamps
- user attribution
- location attribution
- notes and attachments
- approvals where required
- historical event records
- searchable audit history

These shared concepts let features connect without becoming tightly tangled.

## How Features Link Together

### Identity and Access -> Everything
Every domain action requires a known actor and permission context.

### Facilities and Locations -> Cultivation, Tasks, Inventory, Compliance
The physical location model is the anchor for operational records.

### Cultivation -> Inventory
Cultivation consumes materials and produces harvested output.

### Cultivation -> Tasks
Routine and exception-based work is scheduled around plant and room activities.

### Cultivation -> Compliance
Major lifecycle events create traceable regulatory history.

### Inventory -> Compliance
Lot movement, adjustments, and destruction must be traceable.

### Tasks -> Team Management
Work ownership and accountability are tied to users and shifts.

### Tasks + Cultivation + Inventory -> Analytics
Daily activity becomes the basis for performance and trend reporting.

### Compliance -> Reporting
Audit outputs and formal reports depend on complete operational history.

## Recommended Feature Modules for Feature-Driven Development

A practical backend roadmap should be organized into feature modules.

### Phase 1: Platform Foundation
- identity and access
- organizations, facilities, and rooms
- user and role management
- health and operational status

### Phase 2: Core Cultivation
- strains and genetics
- plant batches
- lifecycle stage tracking
- room assignments and movement
- basic cultivation activity logging

### Phase 3: Daily Operations
- task scheduling and execution
- operator workflows
- shift handoff visibility
- room activity timelines

### Phase 4: Inventory Backbone
- inventory catalog
- stock lots
- receiving and adjustments
- internal movement
- cultivation consumption tracking

### Phase 5: Compliance Backbone
- audit trail
- traceability views
- waste and destruction records
- compliance checklists
- report preparation workflows

### Phase 6: Post-Harvest and Output
- harvest recording
- drying and curing tracking
- packaged lot creation
- output inventory management

### Phase 7: Management Visibility
- dashboards
- room and yield insights
- task productivity metrics
- compliance health summaries

### Phase 8: Alerts and Reporting
- rule-driven alerts
- scheduled summaries
- exportable management and compliance reports

## Operational Design Goals

The backend should support these business outcomes:
- one system of record for facility operations
- minimal duplicate data entry
- high accountability by user and location
- complete traceability across the plant lifecycle
- easier compliance readiness
- stronger management visibility
- scalable feature ownership as the app grows

## Boundaries Between Features

Each feature should own its own business rules, but not duplicate core business facts.

Examples:
- cultivation owns plant lifecycle decisions
- inventory owns stock balances and lot movement
- compliance owns audit interpretation and report readiness
- analytics owns aggregated views, not source records
- identity owns access and permissions, not operational history

This keeps the backend understandable and maintainable as features expand.

## Suggested Documentation Structure

If this is adopted as a feature-driven backend, future documents should be broken into:
- product feature map
- domain glossary
- feature responsibilities
- entity relationships
- workflow diagrams
- role and permission model
- reporting requirements
- compliance and audit model
- roadmap by feature phase

## Final Direction

The backend should not be designed as a generic CRUD application. It should be designed as a connected operational platform where cultivation, inventory, team activity, compliance, and analytics all reinforce one another.

Feature-driven development is a strong fit because the business itself is naturally divided into operational domains that share a single traceable flow of work.
