export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  description: string;
  points: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  summary: string;
  description: string;
  stack: string[];
  outcome: string;
};

export const services: Service[] = [
  {
    slug: "data-pipeline-engineering",
    title: "Data Pipeline Engineering",
    short: "Batch & streaming pipelines that move data reliably at any scale.",
    icon: "Waypoints",
    description:
      "We design and build resilient ingestion and transformation pipelines — from nightly batch jobs to sub-second streaming — with lineage, monitoring, and alerting baked in from day one.",
    points: [
      "Streaming ingestion with Kafka, Kinesis and Flink",
      "Batch orchestration with Airflow, Dagster and dbt",
      "Change data capture (CDC) from operational databases",
      "Data quality checks, lineage and observability",
    ],
  },
  {
    slug: "data-warehousing-bi",
    title: "Data Warehousing & BI",
    short: "Modern warehouses and dashboards your whole company can trust.",
    icon: "BarChart3",
    description:
      "We model your data into clean, well-documented warehouses and marts, then ship dashboards and self-serve analytics that give every team answers in minutes, not weeks.",
    points: [
      "Warehouse modelling with Snowflake, BigQuery and Redshift",
      "Transformation layers with dbt and SQLMesh",
      "Executive and operational dashboards",
      "Semantic layers and metric definitions",
    ],
  },
  {
    slug: "cloud-data-platforms",
    title: "Cloud Data Platforms",
    short: "Greenfield or migration — a cloud data platform built to scale.",
    icon: "Cloud",
    description:
      "Whether you're consolidating legacy systems or starting fresh, we architect cloud-native data platforms on AWS, Azure or GCP with infrastructure-as-code, security and cost controls.",
    points: [
      "Lakehouse architecture with Databricks and Iceberg",
      "Cloud migrations with minimal downtime",
      "Infrastructure as code with Terraform",
      "FinOps and cost optimisation reviews",
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    short: "From feature pipelines to production ML and LLM applications.",
    icon: "BrainCircuit",
    description:
      "We take models beyond the notebook: reproducible feature pipelines, training infrastructure, deployment, monitoring — and practical GenAI assistants grounded in your own data.",
    points: [
      "Feature stores and training pipelines",
      "MLOps: deployment, drift monitoring, retraining",
      "LLM applications with retrieval-augmented generation",
      "Forecasting, anomaly detection and recommendations",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "realtime-streaming",
    title: "Real-Time Streaming Platform",
    category: "Streaming",
    client: "Fintech payments provider",
    summary:
      "Sub-second transaction monitoring platform processing 40,000 events per second.",
    description:
      "We replaced a nightly batch fraud-reporting process with a real-time streaming platform. Kafka and Flink now score every transaction in under 800 ms, with exactly-once processing and full replay capability.",
    stack: ["Kafka", "Flink", "Redis", "Snowflake", "Grafana"],
    outcome: "Fraud detection latency dropped from 24 hours to under 1 second.",
  },
  {
    slug: "enterprise-lakehouse",
    title: "Enterprise Lakehouse Migration",
    category: "Platform",
    client: "Retail group, 900+ stores",
    summary:
      "Consolidated 14 legacy databases into a governed lakehouse on Azure.",
    description:
      "A phased migration moved sales, inventory and loyalty data from on-prem SQL servers into a Databricks lakehouse with Unity Catalog governance. dbt models now serve a single source of truth for merchandising.",
    stack: ["Databricks", "Unity Catalog", "dbt", "Azure Data Factory", "Power BI"],
    outcome: "Reporting costs cut by 38% while data refresh went daily to hourly.",
  },
  {
    slug: "cdc-migration",
    title: "Zero-Downtime CDC Migration",
    category: "Migration",
    client: "Healthcare SaaS",
    summary:
      "Migrated a live multi-tenant platform between clouds with zero downtime.",
    description:
      "Using change data capture, we kept two PostgreSQL estates in sync for six weeks, cut over tenant by tenant with instant rollback, and retired the legacy estate without a single minute of planned downtime.",
    stack: ["PostgreSQL", "Debezium", "Kafka", "Terraform", "AWS"],
    outcome: "Zero-downtime cutover across 2,300 tenants with full audit trails.",
  },
  {
    slug: "demand-forecasting",
    title: "Demand Forecasting Engine",
    category: "Machine Learning",
    client: "Quick-commerce startup",
    summary:
      "ML forecasting that cut stock-outs by 31% across 45 dark stores.",
    description:
      "We built an end-to-end forecasting pipeline — feature engineering, gradient-boosted models, and automated retraining — that predicts per-SKU demand 14 days ahead and feeds replenishment directly.",
    stack: ["BigQuery", "Vertex AI", "LightGBM", "Airflow", "Looker"],
    outcome: "Stock-outs down 31% and waste down 18% within one quarter.",
  },
];

export const navServices = services.map((s) => ({
  title: s.title,
  href: `/services/${s.slug}`,
  short: s.short,
}));

export const navProjects = projects.map((p) => ({
  title: p.title,
  href: `/projects/${p.slug}`,
  short: p.summary,
}));
