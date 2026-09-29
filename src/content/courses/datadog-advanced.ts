import type { Course } from "../types";

/**
 * Datadog 심화 (인프라 & DevOps 6/6단계) — datadog-basics를 마친 학습자용.
 *
 * 사실 검증 메모 (2026-09 기준 웹 검색, docs.datadoghq.com / datadoghq.com/blog / opentelemetry.io / registry.terraform.io / sre.google):
 * - Single Step Instrumentation(SSI): Operator DatadogAgent CR `spec.features.apm.instrumentation.enabled/enabledNamespaces/disabledNamespaces/targets`,
 *   Helm `datadog.apm.instrumentation.enabled`(+enabledNamespaces, 최신 Helm 차트는 targets). Cluster Agent 7.52+ 필요, targets는 Operator 1.16+/Helm 차트 3.120+/Agent 7.64+.
 *   지원 언어 Java·Node.js·Python·.NET·Ruby·PHP. 적용에는 파드 재시작(`kubectl rollout restart`) 필요, init 컨테이너 이름 `datadog-init-apm-inject`.
 *   init 컨테이너는 `datadog-init-apm-inject` + `datadog-lib-<언어>-init`. Linux 호스트: `DD_APM_INSTRUMENTATION_ENABLED=host`, Docker: `=docker`("all" 값은 현행 문서에서 미확인 → 본문 제외),
 *   `DD_APM_INSTRUMENTATION_LIBRARIES=언어:메이저`(Node.js 키 js) (docs.datadoghq.com)
 * - 컨텍스트 전파: Datadog 헤더 x-datadog-trace-id / x-datadog-parent-id / x-datadog-sampling-priority, W3C traceparent·tracestate, B3.
 *   `DD_TRACE_PROPAGATION_STYLE` 기본값 `datadog,tracecontext,baggage` (docs.datadoghq.com)
 * - 샘플링: Datadog Agent 기본 목표 초당 10 트레이스(DD_APM_TARGET_TPS), 에러 샘플러 별도 (docs.datadoghq.com)
 * - Service Catalog → Software Catalog로 개편(블로그 "formerly Service Catalog"); 최신 문서는 Internal Developer Portal의 'Catalog', URL app.datadoghq.com/services.
 *   뷰: Ownership·Reliability·Performance·Security·Costs 등. APM/USM/RUM에서 자동 등록 (docs.datadoghq.com, datadoghq.com/blog)
 * - 서비스 맵: 문서 경로 APM > Service Observability > Service Map. env 범위, 왼쪽=사용자 쪽·오른쪽=근본 원인 쪽, 서비스 태그 모니터 상태 표시 (docs.datadoghq.com)
 * - Trace Explorer(APM > Traces): Live Search 15분/인덱스 15일, `@duration:>2s`, `@http.status_code:5*`, `status:error`, `@` = 스팬 속성, 예약 필드(service/resource_name/status/env)는 `@` 없음. List/Timeseries/Top List 뷰 (docs.datadoghq.com)
 * - Continuous Profiler: `DD_PROFILING_ENABLED=true`, 지원 Java·Python·Go·Ruby·Node.js·.NET·PHP(+ddprof), UI APM > Profiler. .NET SSI는 `Auto` 값 (docs.datadoghq.com)
 * - Error Tracking: 유사 에러를 이슈로 자동 그룹화, 소스 APM·로그·RUM·모바일, APM은 Exception Replay (docs.datadoghq.com)
 * - SLO: Metric-based / Monitor-based / Time Slice(1분 또는 5분 슬라이스), 시간 창 7·30·90일, 목표 100% 미만, "New SLO +", "Save and Set Alert" → Burn Rate 탭,
 *   long window 1~48h·short = long/12 자동, 문서 예 14.4(1h)/6(6h)/3(24h), 최대 번 레이트 1/(1-목표). SLO 알림 모니터: Monitors > New Monitor > SLO,
 *   Error Budget 알림·Burn Rate 알림 2종, Monitor-based는 메트릭 모니터 타입만 번 레이트 지원 (docs.datadoghq.com)
 * - 구글 SRE 워크북 표: 14.4(1h/5m, 2%) 페이지, 6(6h/30m, 5%) 페이지, 1(3d/6h, 10%) 티켓. 99.9%/30일 에러 버짓 43.2분 (sre.google)
 * - Incident Management: "Declare Incident", 모니터 Actions > Declare incident, Slack `/datadog incident`, 기본 필수 필드는 제목·심각도 SEV-1(최고)~SEV-5 (Incident Commander는 선택, 검수 시 수정).
 *   상태 Active/Stable/Resolved/Completed. 기본 응답자 유형 Incident Commander + Responder(커스텀 추가 가능). Slack `#incident-<번호>` 채널 자동 생성.
 *   포스트모템 템플릿은 Notebooks/Confluence/Google Drive, `{{incident.title}}` 등 변수, AI 요약 변수는 타임라인 10개 이상 (docs.datadoghq.com)
 * - Synthetics: API(HTTP·SSL·DNS·WebSocket·TCP·UDP·ICMP·gRPC), Multistep API(기본 최대 10단계, 변수 추출), Browser, Mobile. Managed/Private locations (docs.datadoghq.com)
 * - RUM: Digital Experience > Add an Application, npm `@datadog/browser-rum`, `datadogRum.init({applicationId, clientToken, site, service, env, version, sessionSampleRate, sessionReplaySampleRate})`,
 *   Session Replay 기본 defaultPrivacyLevel은 `mask`(텍스트·입력 모두 마스킹; 비밀번호·이메일·카드 입력란은 항상 마스킹) (docs.datadoghq.com)
 * - OTel 리소스 속성 매핑: `deployment.environment.name`→env(구 `deployment.environment`는 폐기 예정, Agent 7.58+), service.name→service, service.version→version (docs.datadoghq.com)
 * - Trace 보존: 커스텀 보존 필터 15일, 지능형 보존 필터(다양성 샘플링+1%) 30일·과금 제외 (docs.datadoghq.com)
 * - 대시보드 JSON Import는 기존/새 대시보드의 설정(⚙) 메뉴에서 실행하며 기존 내용을 덮어씀 (docs.datadoghq.com)
 * - OpenTelemetry 경로 3가지: ① DDOT Collector(Agent 내장, Operator `features.otelCollector.enabled`, Helm `datadog.otelCollector.enabled`, 4317/4318, Agent 7.67+, Kubernetes DaemonSet),
 *   ② Agent OTLP 인제스트(`otlp_config.receiver.protocols.grpc.endpoint 0.0.0.0:4317`/http 4318, Operator `features.otlp.receiver.protocols.grpc.enabled`, Agent 7.32+),
 *   ③ 독립 OTel Collector + Datadog Exporter(자체 운영, tail 샘플링) (docs.datadoghq.com)
 * - Terraform: source "DataDog/datadog", provider api_key/app_key/api_url, 리소스 datadog_monitor(type "metric alert", monitor_thresholds), datadog_dashboard_json,
 *   datadog_service_level_objective(type "metric", query{numerator,denominator}, thresholds{timeframe,target,warning}) (registry.terraform.io, github.com/DataDog)
 * - 대시보드 JSON: 설정(⚙) 메뉴의 "Copy dashboard JSON" / "Export dashboard JSON" / "Import dashboard JSON" (docs.datadoghq.com)
 * - 확신 부족으로 완곡 처리: Software Catalog·Synthetics의 좌측 내비 정확한 라벨(URL과 기능 이름으로 안내), APM 트레이스 메트릭 이름(데모에서는 커스텀 메트릭 예시 사용)
 */
export const datadogAdvanced: Course = {
  slug: "datadog-advanced",
  title: "Datadog 심화: APM·SLO·인시던트 운영",
  subtitle: "느린 요청의 원인 함수까지 찾고, 숫자로 약속하고, 장애를 체계적으로 끝내는 운영 기술",
  description:
    "대시보드는 전부 초록색인데 사용자는 '느리다'고 말합니다. 이 강의는 그 간극을 메우는 Datadog의 심화 기능을 다룹니다. Single Step Instrumentation으로 코드 수정 없이 APM을 켜고, 플레임그래프로 느린 DB 쿼리 한 줄을 찾고, Continuous Profiler로 원인 함수까지 내려갑니다. 이어서 SLI·SLO·에러 버짓으로 '얼마나 안정적이면 충분한가'를 숫자로 정의하고, 번 레이트 알림과 Incident Management로 장애를 선언부터 포스트모템까지 운영합니다. 마지막으로 OpenTelemetry와 Terraform으로 관측 자산을 벤더 종속 없이 코드로 관리하는 법을 배웁니다.",
  category: "devops",
  level: "advanced",
  tags: ["Datadog", "APM", "분산 추적", "SLO", "인시던트", "OpenTelemetry"],
  gradient: ["#6d28d9", "#be185d"],
  icon: "gauge",
  outcomes: [
    "Single Step Instrumentation으로 Kubernetes 서비스에 코드 수정 없이 APM을 켜고 트레이스를 확인할 수 있다",
    "Trace Explorer와 플레임그래프로 p99 느린 요청의 병목 스팬과 원인 함수를 찾을 수 있다",
    "SLI·SLO·에러 버짓을 계산하고 Datadog에서 SLO와 번 레이트 알림을 만들 수 있다",
    "Incident Management로 인시던트를 선언·역할 배정·타임라인 기록·포스트모템까지 운영할 수 있다",
    "OpenTelemetry 데이터를 Datadog으로 보내는 3가지 경로를 비교하고 Terraform으로 모니터·SLO·대시보드를 코드화할 수 있다",
  ],
  modules: [
    {
      slug: "apm-and-tracing",
      title: "APM과 분산 추적",
      description: "요청 하나의 여정을 끝까지 따라가 느린 곳과 원인 함수를 찾는 기술",
      lessons: [
        {
          slug: "why-apm",
          title: "대시보드는 초록인데 사용자는 느리다: APM이 필요한 순간",
          minutes: 5,
          content: `인프라 대시보드는 전부 초록색입니다. 그런데 고객센터에는 "결제가 느려요"가 쌓입니다. 이 간극을 메우는 도구가 **APM**이고, 이 강의의 출발점입니다.

## 인프라 메트릭이 말해 주지 않는 것

- CPU 40%, 메모리 여유, 에러율 0.1% — 모두 정상. 그런데 결제 API의 p99 레이턴시는 4초.
- 인프라 메트릭은 **서버가 건강한지**를 말해 줍니다. **요청 하나가 어디서 시간을 쓰는지**는 말해 주지 않습니다.
- 요청 하나가 5~10개 서비스를 거치면, 로그만으로는 "누구 탓"인지 찾기 어렵습니다.

도로 CCTV와 차량 블랙박스의 차이입니다. CCTV(대시보드)는 도로 전체 흐름을 보여 주지만, 내 차가 **어느 교차로에서 몇 분을 서 있었는지**는 블랙박스(APM)만 압니다.

## APM이 하는 일

- 요청 하나를 **트레이스** 하나로 기록하고, 거쳐 간 구간마다 **스팬**을 남깁니다.
- 서비스별 골든 시그널(요청 수·에러·레이턴시 퍼센타일)을 자동 집계합니다.
- 느린 요청을 열면 플레임그래프가 나오고, 느린 DB 쿼리 한 줄까지 내려갈 수 있습니다.

## 이 강의 로드맵

1. **APM과 분산 추적** — Single Step Instrumentation으로 켜고, Software Catalog·서비스 맵으로 구조를 읽고, 느린 요청과 원인 함수를 찾습니다.
2. **SLO와 인시던트** — "얼마나 안정적이면 충분한가"를 숫자로 정하고, 번 레이트 알림·인시던트 운영·Synthetics·RUM을 더합니다.
3. **플랫폼 운영** — OpenTelemetry로 벤더 종속을 줄이고, Terraform으로 관측 자산을 코드화합니다.

"Datadog 입문"에서 Datadog Agent 설치와 통합 서비스 태깅(env·service·version)을 마쳤다는 전제로 진행합니다.

> 💡 **핵심**: 인프라 메트릭은 "서버가 살아 있나", APM은 "이 요청이 왜 느린가"에 답합니다. 사용자 체감은 후자에서 나옵니다.`,
          illustration: {
            type: "compare",
            title: "인프라 모니터링 vs APM",
            columns: [
              {
                title: "인프라 모니터링",
                icon: "server",
                tone: "muted",
                items: [
                  "단위: 호스트·컨테이너",
                  "질문: 서버가 건강한가",
                  "CPU·메모리·디스크·네트워크",
                  "요청 하나의 경로는 모름",
                ],
              },
              {
                title: "APM",
                icon: "activity",
                tone: "primary",
                items: [
                  "단위: 요청(트레이스)·구간(스팬)",
                  "질문: 이 요청이 왜 느린가",
                  "레이턴시 퍼센타일·에러·처리량",
                  "느린 DB 쿼리 한 줄까지 추적",
                ],
              },
            ],
            caption: "두 시야를 통합 서비스 태깅으로 이어야 '서버는 멀쩡한데 느린' 장애가 풀립니다.",
          },
        },
        {
          slug: "distributed-tracing-basics",
          title: "분산 추적의 원리: 트레이스·스팬·컨텍스트 전파",
          minutes: 6,
          content: `서비스 A가 B를 부르고 B가 DB를 부릅니다. 이 흩어진 조각을 **하나의 요청**으로 이어 붙이는 원리를 알아야 APM 화면이 읽힙니다.

## 트레이스와 스팬

- **트레이스**는 요청 하나의 전체 여정입니다. \`trace_id\` 하나로 묶입니다.
- **스팬**은 여정의 한 구간입니다. \`GET /checkout\` 처리, \`SELECT ... FROM orders\` 쿼리처럼요. 스팬마다 \`span_id\`, 부모 id, 시작 시각, 소요 시간, 태그(\`db.statement\` 등)가 붙습니다.
- 맨 처음 스팬이 **루트 스팬**, 각 서비스에 처음 들어오는 스팬이 **서비스 엔트리 스팬**입니다. 서비스 페이지의 레이턴시·에러율은 엔트리 스팬 기준입니다.

택배 송장번호(trace_id) 하나로 집하·허브·배송 기사의 스캔 기록(스팬)이 이어지고, 어느 거점에서 하루를 묵었는지 보이는 것과 같습니다.

## 컨텍스트 전파: 헤더에 실어 보낸다

A가 B를 호출할 때 추적 라이브러리가 요청 헤더에 식별자를 자동으로 실어 보냅니다.

\`\`\`text
traceparent: 00-<trace-id 32자리 hex>-<span-id 16자리 hex>-01
x-datadog-trace-id: <trace-id 하위 64비트, 10진수>
x-datadog-parent-id: <span-id, 10진수>
x-datadog-sampling-priority: 1
\`\`\`

- \`traceparent\`는 **W3C Trace Context** 표준 헤더로, OpenTelemetry 등과 호환됩니다.
- \`x-datadog-*\`는 Datadog 고유 형식입니다. Datadog 추적 라이브러리는 기본값(\`DD_TRACE_PROPAGATION_STYLE=datadog,tracecontext,baggage\`)으로 **두 형식을 모두 주입하고 읽습니다**. 그래서 OpenTelemetry SDK가 섞인 환경도 한 트레이스로 이어집니다.

## 샘플링: 전부 저장하지 않는다

- Datadog Agent는 기본적으로 **초당 약 10개 트레이스**를 목표로 헤드 기반 샘플링(루트에서 저장 여부를 정해 하위로 전파)을 합니다. 에러 트레이스는 별도 샘플러가 추가로 잡습니다.
- "내 트레이스가 안 보여요"의 가장 흔한 원인이 샘플링입니다. 최근 15분은 Live Search로 샘플링 없이 볼 수 있습니다(5강).

> 💡 **핵심**: 분산 추적 = trace_id를 헤더에 실어 서비스 사이로 넘기는 것. 헤더가 끊기면 트레이스도 끊깁니다.`,
          illustration: {
            type: "flow",
            title: "요청 하나가 남기는 스팬의 사슬",
            nodes: [
              { label: "브라우저 → web", sublabel: "루트 스팬 · trace_id 생성", icon: "globe", tone: "primary" },
              {
                label: "checkout 서비스",
                sublabel: "서비스 엔트리 스팬 GET /checkout",
                icon: "server",
                tone: "accent",
                edgeLabel: "traceparent 헤더로 전파",
              },
              {
                label: "payment 서비스",
                sublabel: "POST /charge",
                icon: "dollar",
                tone: "accent",
                edgeLabel: "같은 trace_id, 새 span_id",
              },
              {
                label: "PostgreSQL",
                sublabel: "SELECT … FROM orders (자식 스팬)",
                icon: "database",
                tone: "warning",
                edgeLabel: "db.statement 태그 기록",
              },
            ],
            caption: "각 칸이 스팬 하나이고, 화살표마다 헤더가 trace_id를 넘겨 줍니다 — 이 사슬이 끊기면 두 개의 트레이스가 됩니다.",
          },
        },
        {
          slug: "single-step-instrumentation",
          title: "Single Step Instrumentation: 코드 수정 없이 APM 켜기",
          minutes: 7,
          content: `예전에는 서비스마다 추적 라이브러리를 넣고 코드를 고쳐야 했습니다. **Single Step Instrumentation**(SSI)은 Datadog Agent 설정 몇 줄로 끝냅니다.

## 동작 원리

- Kubernetes에서는 **Cluster Agent**가 어드미션 컨트롤러로 동작합니다. 새 파드가 뜰 때 \`datadog-init-apm-inject\` init 컨테이너로 추적 라이브러리를 주입합니다.
- 지원 언어: **Java, Node.js, Python, .NET, Ruby, PHP**. Go는 미지원.

관리사무소(Cluster Agent)가 **새 입주자(파드)에게 출입카드를 자동 발급**하는 방식입니다.

## 설정: Operator / Helm / 호스트

DatadogAgent CR(Operator)에 추가합니다.

\`\`\`yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    apm:
      instrumentation:
        enabled: true
        enabledNamespaces:
          - shop
\`\`\`

- Helm 차트는 values에 \`datadog.apm.instrumentation.enabled: true\`와 \`enabledNamespaces\`. Cluster Agent **7.52 이상** 필요.
- Linux 호스트는 \`DD_APM_INSTRUMENTATION_ENABLED=host\`, Docker 컨테이너 대상은 \`DD_APM_INSTRUMENTATION_ENABLED=docker\`. 언어·버전 고정은 \`DD_APM_INSTRUMENTATION_LIBRARIES=java:1,python:3\`.

## 적용은 재시작 후

- 이미 떠 있는 파드는 바뀌지 않습니다. \`kubectl rollout restart deployment/checkout -n shop\`으로 새 파드를 띄워야 주입됩니다.
- 새 파드에 \`datadog-init-apm-inject\` init 컨테이너가 보이면 성공.

**여기서 막힌다면**
- 서비스가 안 보인다 → 파드 재시작, \`enabledNamespaces\`, 통합 서비스 태깅 레이블 확인.
- 파드가 \`Init:Error\` → Agent 파드 로그와 지원 언어 확인.

> 💡 **핵심**: SSI = Cluster Agent가 파드 생성 시 라이브러리를 자동 주입. 설정 → **재시작** → APM > Services 확인, 이 세 박자입니다.`,
          illustration: {
            type: "steps",
            title: "SSI 적용 4단계",
            steps: [
              { label: "DatadogAgent CR 수정", sublabel: "features.apm.instrumentation.enabled: true", icon: "file-text" },
              { label: "kubectl apply", sublabel: "Cluster Agent가 주입 규칙 활성화", icon: "terminal" },
              { label: "rollout restart", sublabel: "새 파드에 init 컨테이너 주입", icon: "refresh" },
              { label: "APM > Services 확인", sublabel: "트래픽 후 서비스 자동 등장", icon: "activity" },
            ],
            caption: "3단계를 빠뜨리면 아무 일도 일어나지 않습니다 — 주입은 파드가 '새로 뜰 때'만 일어납니다.",
          },
          demo: {
            title: "Operator 설정으로 checkout 서비스에 APM 켜기",
            app: {
              kind: "code-editor",
              windowTitle: "datadog-agent.yaml — kubectl",
              files: [
                { id: "f-cr", name: "datadog-agent.yaml", active: true },
                { id: "f-dep", name: "checkout-deployment.yaml" },
              ],
              code: [
                { id: "c1", text: "apiVersion: datadoghq.com/v2alpha1" },
                { id: "c2", text: "kind: DatadogAgent" },
                { id: "c3", text: "metadata:" },
                { id: "c4", text: "name: datadog", indent: 1 },
                { id: "c5", text: "namespace: datadog", indent: 1 },
                { id: "c6", text: "spec:" },
                { id: "c7", text: "features:", indent: 1 },
                { id: "c8", text: "apm:", indent: 2 },
                { id: "c9", text: "instrumentation:", indent: 3, tone: "add", hidden: true },
                { id: "c10", text: "enabled: true", indent: 4, tone: "add", hidden: true },
                { id: "c11", text: "enabledNamespaces:", indent: 4, tone: "add", hidden: true },
                { id: "c12", text: "- shop", indent: 5, tone: "add", hidden: true },
                { id: "c13", text: "logCollection:", indent: 2 },
                { id: "c14", text: "enabled: true", indent: 3 },
              ],
              terminal: [
                { id: "t1", text: "kubectl apply -f datadog-agent.yaml", tone: "cmd", hidden: true },
                { id: "t2", text: "datadogagent.datadoghq.com/datadog configured", tone: "ok", hidden: true },
                { id: "t3", text: "kubectl rollout restart deploy/checkout -n shop", tone: "cmd", hidden: true },
                { id: "t4", text: "deployment.apps/checkout restarted", tone: "ok", hidden: true },
                {
                  id: "t5",
                  text: "kubectl get pod -n shop -l app=checkout -o jsonpath='{.items[0].spec.initContainers[*].name}'",
                  tone: "cmd",
                  hidden: true,
                },
                { id: "t6", text: "datadog-init-apm-inject datadog-lib-js-init", tone: "ok", hidden: true },
                { id: "t7", text: "# 트래픽 유입 후 APM > Services 에 'checkout' 서비스 등장", tone: "out", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① DatadogAgent CR의 apm 아래에 instrumentation 블록을 추가합니다" },
              { t: "move", target: "c8" },
              { t: "click" },
              { t: "type", target: "c9", text: "instrumentation:" },
              { t: "type", target: "c10", text: "enabled: true" },
              { t: "caption", text: "② 먼저 shop 네임스페이스에만 켭니다 (스테이징부터)" },
              { t: "type", target: "c11", text: "enabledNamespaces:" },
              { t: "type", target: "c12", text: "- shop" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 적용하면 Cluster Agent가 주입 규칙을 활성화합니다" },
              { t: "type", target: "t1", text: "kubectl apply -f datadog-agent.yaml" },
              { t: "reveal", target: "t2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 이미 떠 있는 파드는 바뀌지 않으므로 재시작합니다" },
              { t: "reveal", target: "t3" },
              { t: "reveal", target: "t4" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 새 파드에 init 컨테이너가 주입됐는지 확인합니다" },
              { t: "reveal", target: "t5" },
              { t: "reveal", target: "t6" },
              { t: "move", target: "t6" },
              { t: "caption", text: "✅ 코드 한 줄 수정 없이 APM 켜기 완료 — 트래픽이 오면 APM > Services에 나타납니다" },
              { t: "reveal", target: "t7" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "service-catalog-and-map",
          title: "Software Catalog(구 Service Catalog)와 서비스 맵: 의존 관계 읽기",
          minutes: 5,
          content: `서비스가 30개를 넘으면 "이거 누구 담당이지?"와 "이게 죽으면 뭐가 같이 죽지?"가 장애 대응 시간의 절반을 잡아먹습니다. Datadog은 이 두 질문에 카탈로그와 서비스 맵으로 답합니다.

## Service Catalog → Software Catalog

- 예전 이름 **Service Catalog**는 **Software Catalog**로 개편·확장되었습니다. 서비스뿐 아니라 데이터스토어·큐·API·시스템 같은 엔티티까지 다룹니다. 최신 문서는 Internal Developer Portal의 'Catalog'로 부릅니다(\`app.datadoghq.com/services\`).
- SSI로 계측된 서비스는 **자동 등록**됩니다. RUM 앱, Universal Service Monitoring으로 잡힌 서비스도 들어옵니다.
- 서비스별 뷰: **Ownership**(팀·Slack 채널·저장소·온콜), **Performance**(레이턴시·에러율·처리량), **Reliability**(SLO·인시던트·배포), **Security**, **Costs** 등.

카탈로그는 회사 **조직도**(누가 담당), 서비스 맵은 **자리 배치도**(누가 누구와 자주 이야기하는가)입니다.

## 서비스 맵 읽는 법

- APM 메뉴의 **Service Map**을 열고 \`env\` 드롭다운으로 범위(prod/staging)를 고릅니다.
- 점이 서비스, 선이 관측된 호출입니다. 서비스를 **Inspect**하면 **왼쪽은 사용자에 가까운 호출자, 오른쪽은 근본 원인일 가능성이 높은 피호출자**입니다.
- 모니터에 \`service\` 태그를 붙여 두면 모니터 상태가 노드 색으로 표시됩니다. 빨간 노드에서 **오른쪽으로** 따라가면 원인 후보가 나옵니다.

장애 때 동선: 빨간 노드 → 오른쪽 의존 서비스 → 카탈로그 Ownership의 온콜 → 호출. 이 30초가 "누구한테 물어봐야 하지?" 30분을 대신합니다.

> 💡 **핵심**: 카탈로그는 "누구 것인가", 서비스 맵은 "무엇에 의존하는가". 둘 다 APM 데이터에서 자동으로 채워지므로 SSI를 켠 순간 공짜로 얻는 지도입니다.`,
          illustration: {
            type: "grid",
            title: "Software Catalog가 답하는 질문들",
            items: [
              { label: "Ownership", sublabel: "팀 · Slack · 저장소 · 온콜", icon: "users", tone: "primary" },
              { label: "Performance", sublabel: "레이턴시 · 에러율 · 처리량", icon: "gauge", tone: "accent" },
              { label: "Reliability", sublabel: "SLO · 인시던트 · 배포 이력", icon: "shield", tone: "success" },
              { label: "Relationships", sublabel: "의존 관계 그래프 = 서비스 맵", icon: "network", tone: "warning" },
              { label: "엔티티 종류", sublabel: "서비스 · 데이터스토어 · 큐 · API", icon: "boxes", tone: "muted" },
              { label: "자동 등록 소스", sublabel: "APM · USM · RUM", icon: "activity", tone: "muted" },
            ],
            caption: "메타데이터(Ownership)는 사람이 채우고, 나머지는 계측 데이터가 채웁니다 — 비어 있는 칸이 곧 팀의 관측 사각지대입니다.",
          },
        },
        {
          slug: "finding-slow-requests",
          title: "느린 요청 찾기: 플레임그래프·스팬 태그·Trace Explorer",
          minutes: 7,
          content: `"결제가 느려요" 문의가 왔지만 서버는 멀쩡합니다. APM으로 **어느 쿼리가 몇 초를 잡아먹는지** 15분 안에 찾아봅니다.

## p99에서 시작해 Trace Explorer로

- 평균 200ms여도 p99가 2.4초면 **100명 중 1명은 2.4초 이상** 기다립니다.
- **APM > Services**의 Latency 그래프에서 p50~p99를 고를 수 있습니다. p99가 튀는 리소스를 먼저 잡습니다.
- **APM > Traces** 검색 문법: \`service:checkout env:prod status:error\`, \`@duration:>2s\`, \`@http.status_code:5*\`.
- \`@\`가 붙는 것은 **스팬 속성**(\`@db.statement\` 등). 붙지 않는 것은 예약 필드(\`service\`, \`resource_name\`, \`status\`, \`env\`)입니다.
- **Live Search**는 최근 15분의 모든 스팬을 샘플링 없이 보여 줍니다. 그 밖은 보존 필터로 인덱스된 스팬만 검색됩니다(커스텀 15일, 지능형 보존 필터 30일).

## 플레임그래프 읽기

트레이스를 열면 플레임그래프가 나옵니다. 간트 차트처럼 **가장 긴 막대가 공기를 결정**합니다.

- 위가 루트 스팬, 아래가 자식 스팬. 가로 길이가 시간, 색이 서비스입니다.
- 가장 긴 자식 막대가 병목. 짧은 막대가 수십 개 반복되면 N+1 쿼리. 부모 아래 **빈 공간**은 계측되지 않은 구간입니다.
- 스팬을 클릭하면 **스팬 태그**(\`db.statement\`, \`http.url\`, \`error.message\`)가 보입니다. "이 요청이 왜 느렸나"는 집계 메트릭이 아니라 스팬 태그에서 나옵니다.

**여기서 막힌다면**
- \`@duration:>2000\`이 안 먹는다 → 단위를 붙이세요(\`2s\`, \`500ms\`).
- 어제 트레이스가 없다 → 보존 필터(Retention Filters)에 해당 서비스가 있는지 확인.

> 💡 **핵심**: 서비스 페이지 p99 → Traces에서 \`@duration:>2s\` → 플레임그래프의 가장 긴 막대 → 스팬 태그의 \`db.statement\`. 이 네 번 클릭이 APM 디버깅의 기본 동선입니다.`,
          illustration: {
            type: "stack",
            title: "플레임그래프를 층으로 읽으면",
            layers: [
              { label: "GET /checkout — 2.62s", sublabel: "checkout · 루트 스팬 (전체 시간)", icon: "globe", tone: "primary" },
              { label: "SELECT * FROM orders WHERE user_id = ? — 1.94s", sublabel: "postgres · 가장 긴 자식 = 병목", icon: "database", tone: "warning" },
              { label: "POST /charge — 0.31s", sublabel: "payment · 정상 범위", icon: "dollar", tone: "accent" },
              { label: "(계측되지 않은 구간) — 0.37s", sublabel: "checkout 자체 코드 · 빈 공간", icon: "cpu", tone: "muted" },
            ],
            caption: "부모 시간에서 자식 막대를 뺀 '빈 공간'도 단서입니다 — 거기가 다음 강의의 프로파일링이 필요한 자리입니다.",
          },
          demo: {
            title: "Trace Explorer에서 느린 DB 스팬 찾기",
            app: {
              kind: "browser",
              url: "app.datadoghq.com/apm/traces",
              blocks: [
                { id: "b-h", type: "heading", label: "APM > Traces" },
                { id: "b-search", type: "input", label: "Search for spans…" },
                { id: "b-p99", type: "badge", label: "checkout · p99 2.41s · 37 spans", hidden: true },
                { id: "b-sort", type: "button", label: "Duration ▼" },
                { id: "b-row1", type: "card", label: "GET /checkout · 2.62s · checkout · prod", hidden: true },
                { id: "b-row2", type: "card", label: "GET /checkout · 2.38s · checkout · prod", hidden: true },
                { id: "b-detail", type: "heading", label: "Trace 7f3a2c… · Flame Graph", hidden: true },
                { id: "b-span1", type: "card", label: "▇▇▇▇▇▇▇▇▇▇ checkout · GET /checkout · 2.62s", hidden: true },
                { id: "b-span2", type: "card", label: "  ▇▇▇▇▇▇▇ postgres · SELECT * FROM orders · 1.94s", hidden: true },
                { id: "b-span3", type: "card", label: "  ▇ payment · POST /charge · 0.31s", hidden: true },
                { id: "b-tags", type: "button", label: "Span Tags", hidden: true },
                { id: "b-tag1", type: "card", label: "db.statement: SELECT * FROM orders WHERE user_id = ?", hidden: true },
                { id: "b-tag2", type: "card", label: "db.row_count: 48,213 · peer.hostname: orders-db", hidden: true },
                { id: "b-insight", type: "badge", label: "병목: user_id 인덱스 없음 → 풀스캔 1.94s", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① checkout 서비스의 2초 넘는 스팬만 검색합니다" },
              { t: "move", target: "b-search" },
              { t: "click" },
              { t: "type", target: "b-search", text: "service:checkout env:prod @duration:>2s" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "b-p99" },
              { t: "caption", text: "② Duration 내림차순으로 정렬해 가장 느린 요청을 맨 위로" },
              { t: "move", target: "b-sort" },
              { t: "click" },
              { t: "reveal", target: "b-row1" },
              { t: "reveal", target: "b-row2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 가장 느린 트레이스를 열면 플레임그래프가 나옵니다" },
              { t: "move", target: "b-row1" },
              { t: "click" },
              { t: "reveal", target: "b-detail" },
              { t: "reveal", target: "b-span1" },
              { t: "reveal", target: "b-span2" },
              { t: "reveal", target: "b-span3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 가장 긴 자식 막대(postgres)를 클릭해 스팬 태그를 봅니다" },
              { t: "move", target: "b-span2" },
              { t: "click" },
              { t: "reveal", target: "b-tags" },
              { t: "click", target: "b-tags" },
              { t: "reveal", target: "b-tag1" },
              { t: "reveal", target: "b-tag2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "✅ 원인 확정 — orders 테이블 풀스캔. 인덱스 추가 후 같은 검색으로 재확인합니다" },
              { t: "reveal", target: "b-insight" },
              { t: "move", target: "b-insight" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "profiling-and-error-tracking",
          title: "Continuous Profiler와 Error Tracking: 원인 함수까지",
          minutes: 6,
          content: `트레이스는 "어느 스팬이 느린지"까지 알려 줍니다. 스팬 안쪽, **어느 함수가 CPU를 태우는지**는 프로파일링이 필요합니다. 수천 건 쏟아지는 에러를 읽을 수 있게 묶는 것이 Error Tracking입니다.

## Continuous Profiler

- 실행 중인 프로세스의 CPU·메모리 할당·wall time 등을 낮은 오버헤드로 **항상** 수집합니다. 응급실(트레이스)이 아니라 상시 건강검진입니다.
- 켜기: 추적 라이브러리가 있다면 환경변수 하나입니다. Kubernetes면 컨테이너 \`env\`에 추가하고 롤아웃합니다.

\`\`\`yaml
env:
  - name: DD_PROFILING_ENABLED
    value: "true"
\`\`\`

- 지원 언어: Java, Python, Go, Ruby, Node.js, .NET, PHP.
- **APM > Profiler**에서 서비스를 고르면 **함수·라인 단위** 플레임그래프가 나옵니다.
- 트레이스 스팬의 **Code Hotspots**를 누르면 그 순간의 프로파일로 점프합니다. "계측되지 않은 빈 공간"이 여기서 풀립니다.

## Error Tracking

- 스택 트레이스와 메시지가 비슷한 에러를 **이슈(issue) 하나로 자동 묶습니다**. 소스는 APM 트레이스·로그·RUM·모바일 SDK.
- 이슈마다 첫·마지막 발생, 영향 사용자 수가 보이고, 소스코드 통합을 연결하면 의심 커밋까지 표시됩니다.
- APM 소스일 때 **Exception Replay**: 예외 순간의 변수 값을 캡처해 재현 없이 원인을 봅니다.
- 새 이슈가 생기거나 급증하면 **Error Tracking 모니터** 타입으로 알림을 보냅니다.

고객센터가 같은 문의 500건을 FAQ 한 항목으로 묶는 것과 같습니다.

함께 쓰는 동선: 새 배포 → Error Tracking에 새 이슈 → 대표 트레이스 → 느린 스팬의 Code Hotspots → 원인 함수. 배포 후 10분 안에 "어느 함수를 되돌릴지"가 나옵니다.

> 💡 **핵심**: 트레이스는 요청 단위, 프로파일은 함수 단위, Error Tracking은 에러를 이슈 단위로. 셋이 이어지면 "느리다"에서 "이 함수의 이 줄"까지 내려갑니다.`,
          illustration: {
            type: "compare",
            title: "Continuous Profiler vs Error Tracking",
            columns: [
              {
                title: "Continuous Profiler",
                icon: "cpu",
                tone: "primary",
                items: [
                  "질문: 어느 함수가 자원을 쓰나",
                  "CPU · 메모리 할당 · wall time",
                  "DD_PROFILING_ENABLED=true",
                  "APM > Profiler · Code Hotspots",
                ],
              },
              {
                title: "Error Tracking",
                icon: "bug",
                tone: "warning",
                items: [
                  "질문: 어떤 에러가 새로 생겼나",
                  "유사 에러 → 이슈로 자동 그룹화",
                  "APM · 로그 · RUM · 모바일 소스",
                  "Exception Replay · 새 이슈 알림",
                ],
              },
            ],
            caption: "왼쪽은 '느림'의 원인 함수를, 오른쪽은 '깨짐'의 새 패턴을 잡습니다 — 배포 직후에는 둘을 나란히 열어 두세요.",
          },
        },
      ],
    },
    {
      slug: "slo-and-incidents",
      title: "SLO와 인시던트",
      description: "얼마나 안정적이면 충분한지 숫자로 약속하고, 장애를 선언부터 회고까지 운영하기",
      lessons: [
        {
          slug: "sli-slo-error-budget",
          title: "SLI·SLO·에러 버짓: 얼마나 안정적이면 충분한가",
          minutes: 6,
          content: `"100% 안정"은 목표가 아닙니다. 비용이 무한대이고, 어차피 달성도 못 합니다. SRE는 대신 **"얼마나 실패해도 괜찮은가"**를 숫자로 정합니다. 그 숫자가 SLO이고, 남은 실패 허용량이 에러 버짓입니다.

## 세 단어의 관계

- **SLI** — 잰 값. "성공 응답 비율", "1초 안에 응답한 비율". 보통 \`좋은 이벤트 / 전체 이벤트\`로 계산합니다.
- **SLO** — 그 값의 목표. "30일 동안 99.9% 이상".
- **SLA** — 고객과의 계약. 어기면 보상. 보통 SLO보다 느슨하게 잡아 내부 목표가 먼저 경고를 울리게 합니다.

용돈에 비유하면, SLO는 "이번 달 실패에 쓸 수 있는 용돈 한도"를 정하는 것이고, 에러 버짓은 **남은 잔액**입니다.

## 에러 버짓 계산

99.9%면 허용 실패는 0.1%입니다. 30일은 43,200분이니 0.1%는 **43.2분**입니다.

\`\`\`text
에러 버짓 = (1 - SLO) × 기간
99.9%  × 30일 = 0.001  × 43,200분 = 43.2분  (약 43분)
99.99% × 30일 = 0.0001 × 43,200분 = 4.3분
99.5%  × 30일 = 0.005  × 43,200분 = 216분 (3.6시간)
\`\`\`

요청 수 기준이면 30일 1,000만 요청에 99.9%는 **실패 1만 건**까지 허용입니다. "9가 하나 늘면 허용량은 10분의 1"이라는 감각을 가져가세요.

## 버짓으로 의사결정하기

- 버짓이 **넉넉하면** 배포 속도를 올리고 실험을 늘립니다. 안정성을 너무 지키는 것도 낭비입니다.
- 버짓이 **바닥이면** 기능 배포를 멈추고 안정화 작업을 우선합니다. 이 규칙을 팀이 미리 합의해 두는 것이 SLO의 진짜 가치입니다.
- 좋은 SLI 고르기: **사용자가 체감하는 것**(가용성, 레이턴시)을, 사용자에 가까운 지점(로드밸런서, 서비스 엔트리 스팬)에서 잽니다. CPU 사용률은 SLI가 아닙니다.
- 목표는 현재 실측치보다 **조금만 높게**. 100%는 버짓이 0이라 알림이 의미를 잃습니다.

> 💡 **핵심**: SLI는 재는 것, SLO는 약속, 에러 버짓은 남은 잔액. 99.9%/30일 = 약 43분 — 이 숫자 하나를 외우면 나머지는 비례식입니다.`,
          illustration: {
            type: "cycle",
            title: "에러 버짓이 돌리는 의사결정 루프",
            center: "30일 롤링",
            nodes: [
              { label: "SLI 측정", sublabel: "좋은 이벤트 / 전체", icon: "gauge" },
              { label: "SLO와 비교", sublabel: "99.9% 목표", icon: "target" },
              { label: "버짓 잔량 확인", sublabel: "43.2분 중 남은 시간", icon: "wallet" },
              { label: "배포 속도 결정", sublabel: "가속 또는 동결", icon: "rocket" },
            ],
            caption: "SLO의 목적은 알림이 아니라 '이번 주에 배포해도 되는가'라는 팀의 결정을 숫자에 맡기는 것입니다.",
          },
        },
        {
          slug: "slo-in-datadog",
          title: "Datadog SLO 만들기와 번 레이트 알림",
          minutes: 7,
          content: `계산은 끝났으니 Datadog에 SLO를 만들고, "버짓이 위험한 속도로 타고 있다"를 알려 주는 번 레이트 알림을 붙입니다.

## 세 종류의 SLO와 만들기

- **Metric-based** — \`좋은 이벤트 / 전체 이벤트\`를 카운트 메트릭으로 계산. 요청 성공률 같은 요청 기반 SLI용.
- **Monitor-based** — 기존 모니터가 OK였던 **시간 비율**.
- **Time Slice** — 메트릭 조건(예: p99 < 1s)을 1분 또는 5분 슬라이스로 평가한 시간 비율. 모니터 없이 만들 수 있어 최근 권장됩니다.
- 시간 창은 7·30·90일. 목표는 반드시 **100% 미만**이어야 에러 버짓이 생깁니다.
- 만들기: **Service Management > SLOs** → **New SLO +** → 종류·쿼리·목표(99.9%·30일) → **Save and Set Alert**.

## 번 레이트 알림

번 레이트는 \`현재 에러율 / (1 - SLO)\`. 1이면 기간 끝에 딱 맞게 소진, 14.4면 14.4배 빠릅니다. 연료 잔량보다 **소모 속도**가 먼저 위험을 알립니다.

- 알림은 **Error Budget 알림**(버짓 n% 소진)과 **Burn Rate 알림**(소진 속도 초과) 두 종류.
- **long window**와 **short window**를 둘 다 넘어야 울려 스파이크 오탐을 거릅니다. long(1~48시간)을 고르면 short는 **long의 1/12**로 자동 계산됩니다.
- 구글 SRE 워크북 권장값(99.9%/30일): **14.4**(1시간/5분, 버짓 2% 소진 → 호출), **6**(6시간/30분, 5% → 호출), **1**(3일/6시간, 10% → 티켓).

**여기서 막힌다면**
- 목표에 100을 넣을 수 없다 → 의도된 제한. 99.99처럼 100 미만으로.
- Monitor-based SLO에 번 레이트 탭이 없다 → 메트릭 계열 모니터만 지원. Time Slice로 바꾸세요.

> 💡 **핵심**: 요청 기반은 Metric-based, 시간 기반은 Time Slice. 알림은 번 레이트 14.4(1h)와 6(6h) 두 개면 대부분의 팀에 충분합니다.`,
          illustration: {
            type: "compare",
            title: "Datadog SLO 3종 고르기",
            columns: [
              {
                title: "Metric-based",
                icon: "chart",
                tone: "primary",
                items: ["좋은 이벤트 / 전체 이벤트", "요청 성공률 · 카운트 기반", "분자·분모 메트릭 쿼리", "번 레이트 알림 지원"],
              },
              {
                title: "Monitor-based",
                icon: "bell",
                tone: "muted",
                items: ["모니터 OK 시간 비율", "시간 기반 · 모니터 필요", "여러 모니터 묶기 가능", "메트릭 모니터만 번 레이트"],
              },
              {
                title: "Time Slice",
                icon: "timer",
                tone: "success",
                items: ["조건 만족 슬라이스 비율", "시간 기반 · 모니터 불필요", "1분 또는 5분 슬라이스", "보정(correction) 처리 깔끔"],
              },
            ],
            caption: "새로 만든다면 요청은 Metric-based, 업타임은 Time Slice — Monitor-based는 이미 있는 모니터를 재활용할 때만.",
          },
          demo: {
            title: "Metric-based SLO 99.9% 만들고 번 레이트 알림 붙이기",
            app: {
              kind: "browser",
              url: "app.datadoghq.com/slo",
              blocks: [
                { id: "b-h", type: "heading", label: "Service Management > SLOs" },
                { id: "b-new", type: "button", label: "New SLO +" },
                { id: "b-type-m", type: "card", label: "Metric-based — 좋은 이벤트 / 전체 이벤트 (카운트)", hidden: true },
                { id: "b-type-t", type: "card", label: "Time Slice — 조건을 만족한 시간 비율", hidden: true },
                { id: "b-num", type: "input", label: "Good events (numerator)", hidden: true },
                { id: "b-den", type: "input", label: "Total events (denominator)", hidden: true },
                { id: "b-target", type: "input", label: "Target (%)", hidden: true },
                { id: "b-window", type: "badge", label: "Time window: 30 days · rolling", hidden: true },
                { id: "b-eb", type: "badge", label: "Error budget: 43.2 min / 30 days", hidden: true },
                { id: "b-save", type: "button", label: "Save and Set Alert", hidden: true },
                { id: "b-tab", type: "button", label: "Burn Rate", hidden: true },
                { id: "b-br", type: "input", label: "Burn rate threshold", hidden: true },
                { id: "b-long", type: "input", label: "Long window (hours)", hidden: true },
                { id: "b-short", type: "badge", label: "Short window: 5 min (auto = long ÷ 12)", hidden: true },
                { id: "b-done", type: "button", label: "Save and Exit", hidden: true },
                { id: "b-ok", type: "badge", label: "✅ checkout-availability SLO + Burn Rate 모니터 생성", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① SLO 목록에서 New SLO +를 누릅니다" },
              { t: "move", target: "b-new" },
              { t: "click" },
              { t: "reveal", target: "b-type-m" },
              { t: "reveal", target: "b-type-t" },
              { t: "caption", text: "② 요청 성공률이므로 Metric-based를 선택합니다" },
              { t: "move", target: "b-type-m" },
              { t: "click" },
              { t: "reveal", target: "b-num" },
              { t: "reveal", target: "b-den" },
              { t: "caption", text: "③ 분자는 성공 요청, 분모는 전체 요청 카운트 메트릭" },
              { t: "type", target: "b-num", text: "sum:shop.requests{status:ok}.as_count()" },
              { t: "type", target: "b-den", text: "sum:shop.requests{*}.as_count()" },
              { t: "caption", text: "④ 목표 99.9%, 30일 롤링 — 에러 버짓 43.2분이 자동 계산됩니다" },
              { t: "reveal", target: "b-target" },
              { t: "type", target: "b-target", text: "99.9" },
              { t: "reveal", target: "b-window" },
              { t: "reveal", target: "b-eb" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ Save and Set Alert → Burn Rate 탭" },
              { t: "reveal", target: "b-save" },
              { t: "click", target: "b-save" },
              { t: "reveal", target: "b-tab" },
              { t: "click", target: "b-tab" },
              { t: "reveal", target: "b-br" },
              { t: "reveal", target: "b-long" },
              { t: "caption", text: "⑥ 임계값 14.4, long window 1시간 — short window는 자동으로 5분" },
              { t: "type", target: "b-br", text: "14.4" },
              { t: "type", target: "b-long", text: "1" },
              { t: "reveal", target: "b-short" },
              { t: "wait", ms: 400 },
              { t: "reveal", target: "b-done" },
              { t: "click", target: "b-done" },
              { t: "caption", text: "✅ SLO와 번 레이트 모니터 완성 — 6시간/6 짝을 하나 더 만들면 표준 구성입니다" },
              { t: "reveal", target: "b-ok" },
              { t: "move", target: "b-ok" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "incident-management",
          title: "Incident Management: 선언·역할·타임라인·포스트모템",
          minutes: 6,
          content: `알림이 울렸고 진짜 장애입니다. 가장 큰 손실은 기술이 아니라 **혼란**에서 옵니다. 누가 지휘하고, 어디서 소통하고, 무엇을 기록하는지가 정해져 있으면 장애가 절반 시간에 끝납니다.

## 선언: Declare Incident

- 경로: **Service Management > Incident Management > Declare Incident**. 모니터 알림의 **Actions > Declare incident**, Slack \`/datadog incident\`로도 됩니다.
- 기본 필수 항목은 **제목**과 **심각도**(SEV-1이 가장 심각, SEV-5까지). **Incident Commander**(지휘자)는 선택 항목이지만 선언 시점에 바로 지정하는 것이 원칙입니다.
- Slack 연동 시 \`#incident-<번호>\` 채널이 자동 생성되고, 상태 변경 시 토픽이 갱신됩니다.

## 역할과 상태

- 기본 응답자 유형은 **Incident Commander**(삭제·이름 변경 불가)와 **Responder**(조사·복구).
- 상태는 **Active**(영향 진행 중) → **Stable**(영향 멎음, 조사 중) → **Resolved**(조사 완료) → **Completed**(후속 조치 완료).

화재 지휘관은 **직접 호스를 잡지 않습니다**.

## 타임라인과 포스트모템

- **타임라인**에는 상태 변경, 담당 지정, Slack 메시지, 첨부 그래프가 자동으로 쌓입니다.
- **포스트모템**은 Incident Settings의 템플릿으로 만듭니다. Datadog Notebooks·Confluence·Google Drive에 저장. \`{{incident.title}}\` 같은 변수가 자동으로 채워지고, 타임라인이 10개 이상이면 AI 요약 변수도 쓸 수 있습니다. 원칙은 사람을 탓하지 않는(blameless) 서술.
- 재발 방지 작업은 **Follow-ups**로 등록해 Jira 등으로 넘깁니다.

> 💡 **핵심**: 선언(제목·SEV, 그리고 Commander 지정) → 채널 자동 생성 → 상태 4단계 → 타임라인이 포스트모템의 재료. 지휘자는 손이 아니라 머리로 일합니다.`,
          illustration: {
            type: "chat",
            title: "#incident-1042 (Slack 자동 생성 채널)",
            messages: [
              { role: "system", text: "Datadog: SEV-2 인시던트 #1042 선언됨 — 'checkout 5xx 급증'. Commander: 김온콜. 상태: Active" },
              { role: "user", text: "[Commander] 영향 범위부터. 결제 실패율과 시작 시각 확인해 주세요. 저는 CS팀에 공지합니다." },
              { role: "ai", text: "[Responder] 14:02부터 결제 실패 12%. 서비스 맵에서 payment → orders-db 빨간 노드. 어제 배포된 v2.4.0 의심." },
              { role: "user", text: "[Commander] v2.4.0 롤백 진행해 주세요. 타임라인에 그래프 첨부했습니다." },
              { role: "system", text: "Datadog: 상태 변경 Active → Stable (14:31). 채널 토픽 갱신됨" },
              { role: "ai", text: "[Responder] 롤백 완료, 실패율 0.2%로 복귀. 근본 원인은 포스트모템에서." },
            ],
            caption: "지휘자는 방향과 소통을, 대응자는 조사와 복구를 — 채널의 모든 메시지가 타임라인에 남아 포스트모템의 초안이 됩니다.",
          },
        },
        {
          slug: "synthetics-and-rum",
          title: "사용자 관점 감시: Synthetics 테스트와 RUM",
          minutes: 6,
          content: `서버 쪽 지표가 전부 정상인데 로그인 버튼이 안 눌리는 장애가 있습니다. 사용자 쪽에서 봐야만 보이는 문제입니다. Datadog은 **로봇 고객**(Synthetics)과 **진짜 고객**(RUM) 두 시야를 제공합니다.

## Synthetics: 로봇 고객을 보낸다

- **API 테스트**: HTTP·SSL·DNS·WebSocket·TCP·UDP·ICMP·gRPC 요청을 주기적으로 보내 상태 코드·응답 시간·인증서 만료를 검사합니다.
- **Multistep API 테스트**: 여러 요청을 체인으로 묶고(기본 최대 10단계), 로그인 응답의 토큰을 **변수로 추출**해 다음 요청에 씁니다.
- **Browser 테스트**: 실제 브라우저로 클릭·입력을 녹화해 재생합니다.
- 실행 위치는 **Managed locations**(전 세계 Datadog 거점) 또는 **Private locations**(사내망용 자체 실행기).
- 만들기: **New Test** → 종류 → URL과 어설션 → 위치·주기 → 알림.

미스터리 쇼퍼처럼, 손님이 없는 시간에도 "결제 단말기가 작동하는지"를 확인합니다.

## RUM: 진짜 사용자의 브라우저에서

**Digital Experience > Add an Application**에서 JavaScript 앱을 만들면 \`applicationId\`와 \`clientToken\`이 발급됩니다.

\`\`\`javascript
import { datadogRum } from "@datadog/browser-rum";
datadogRum.init({
  applicationId: "<APP_ID>",
  clientToken: "<CLIENT_TOKEN>",
  site: "datadoghq.com",
  service: "shop-web", env: "prod", version: "1.4.0",
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
});
\`\`\`

- 수집 항목: 페이지 로드 시간, Core Web Vitals, JS 에러, 리소스 로딩, 사용자 액션.
- **세션 리플레이**: 사용자 화면을 영상처럼 재생합니다. 기본값 \`defaultPrivacyLevel: "mask"\`는 텍스트·입력값을 모두 가리고, 비밀번호·이메일·카드번호 입력란은 항상 마스킹됩니다.
- RUM 이벤트는 백엔드 트레이스와 연결됩니다.

Synthetics는 **트래픽이 없어도** 감시하고, RUM은 **실제 체감**을 봅니다. 대체가 아니라 보완입니다.

> 💡 **핵심**: Synthetics는 "지금 정상인가"를 밖에서 묻고, RUM은 "사용자가 실제로 어땠나"를 안에서 듣습니다. 배포 직후엔 Synthetics, 불만 접수 후엔 RUM 세션 리플레이.`,
          illustration: {
            type: "grid",
            title: "사용자 관점 감시 도구 지도",
            items: [
              { label: "API 테스트", sublabel: "HTTP · SSL · DNS · gRPC 등", icon: "link", tone: "primary" },
              { label: "Multistep API", sublabel: "최대 10단계 · 변수 추출", icon: "workflow", tone: "primary" },
              { label: "Browser 테스트", sublabel: "클릭 여정 녹화·재생", icon: "monitor", tone: "primary" },
              { label: "Private location", sublabel: "사내망·스테이징 실행기", icon: "lock", tone: "muted" },
              { label: "RUM 브라우저 SDK", sublabel: "Web Vitals · JS 에러 · 액션", icon: "users", tone: "accent" },
              { label: "세션 리플레이", sublabel: "화면 재생 · 입력 마스킹", icon: "play", tone: "accent" },
            ],
            caption: "파란 칸은 트래픽이 없어도 돌고, 보라 칸은 실제 방문자가 있어야 채워집니다 — 그래서 둘 다 필요합니다.",
          },
        },
      ],
    },
    {
      slug: "platform-practices",
      title: "플랫폼 운영",
      description: "벤더 종속을 줄이고 관측 자산을 코드로 관리하는 플랫폼 팀의 실천법",
      lessons: [
        {
          slug: "opentelemetry-and-datadog",
          title: "OpenTelemetry와 Datadog: DDOT Collector, 벤더 종속 줄이기",
          minutes: 6,
          content: `계측 코드를 한 벤더 전용으로 박아 두면 백엔드를 바꾸기가 거의 불가능합니다. **OpenTelemetry**로 계측을 표준화하고, Datadog으로 보내는 경로 셋을 비교합니다.

## 경로 1: DDOT Collector (권장 기본값)

- **DDOT**는 Datadog Agent에 내장된 OpenTelemetry Collector입니다. 각 노드에서 Agent와 함께 뜨고, 앱은 같은 노드의 4317(gRPC)/4318(HTTP)로 OTLP를 보냅니다.

\`\`\`yaml
# DatadogAgent CR 일부 (Datadog Operator)
spec:
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
\`\`\`

Helm이면 \`datadog.otelCollector.enabled: true\`, Agent 7.67 이상.

## 경로 2·3: OTLP 인제스트, 독립 Collector

- **Datadog Agent의 OTLP 인제스트** — 기존 Datadog Agent가 OTLP를 **직접** 받습니다. 설정 키는 \`otlp_config.receiver.protocols.grpc.endpoint: 0.0.0.0:4317\`(HTTP 4318). 가장 가볍지만 Collector 프로세서는 못 씁니다.
- **독립 OpenTelemetry Collector + Datadog Exporter** — 벤더 중립성이 최대이고 tail 샘플링도 가능하지만, Collector 운영은 팀 몫입니다.

**220V 표준 콘센트**처럼, 앱은 OTLP 플러그만 갖추면 어디에 꽂을지는 나중에 정합니다.

## 앱 쪽에서 챙길 것

- 표준 환경변수 \`OTEL_SERVICE_NAME\`, \`OTEL_RESOURCE_ATTRIBUTES=deployment.environment.name=prod,service.version=1.4.0\`을 Datadog이 통합 서비스 태깅으로 매핑합니다. 옛 표기 \`deployment.environment\`는 폐기 예정.
- 헤더는 W3C \`traceparent\`. Datadog 라이브러리도 기본으로 읽어(2강) OTel SDK와 SSI 서비스가 섞여도 트레이스가 이어집니다.

> 💡 **핵심**: 새로 시작하면 DDOT, 이미 Agent가 있고 가볍게면 OTLP 인제스트, 이미 Collector를 운영 중이면 Datadog Exporter. 앱은 언제나 OTLP 표준만 바라보게 하세요.`,
          illustration: {
            type: "compare",
            title: "OpenTelemetry → Datadog 3가지 경로",
            columns: [
              {
                title: "DDOT Collector",
                icon: "boxes",
                tone: "primary",
                items: ["Agent 내장 OTel Collector", "표준 파이프라인 + Datadog 기능", "features.otelCollector.enabled", "새 Kubernetes 도입의 기본값"],
              },
              {
                title: "Agent OTLP 인제스트",
                icon: "download",
                tone: "accent",
                items: ["기존 Agent가 4317/4318 수신", "가장 가벼운 시작", "프로세서 커스터마이징 불가", "Agent 이미 있을 때"],
              },
              {
                title: "독립 Collector + Exporter",
                icon: "route",
                tone: "muted",
                items: ["자체 운영 OTel Collector", "tail 샘플링 등 고급 파이프라인", "벤더 중립성 최대", "운영 부담은 팀 몫"],
              },
            ],
            caption: "세 경로 모두 앱 쪽 코드는 같습니다 — OTLP로 내보내기만 하면 경로는 인프라 팀이 나중에 바꿀 수 있습니다.",
          },
        },
        {
          slug: "observability-as-code-and-next",
          title: "관측 자산을 코드로: Terraform 프로바이더·대시보드 JSON·모니터 템플릿 + 마무리",
          minutes: 7,
          content: `클릭으로 만든 대시보드 50개와 모니터 200개. 누가 언제 왜 바꿨는지 모르고, 스테이징에 똑같이 만들려면 반나절입니다. 손맛 요리를 **레시피**로 바꾸듯, 관측 자산도 IaC로 관리합니다.

## Terraform Datadog 프로바이더

\`\`\`hcl
terraform {
  required_providers {
    datadog = { source = "DataDog/datadog" }
  }
}
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
  api_url = "https://api.datadoghq.com/"  # EU는 api.datadoghq.eu
}
\`\`\`

키는 변수나 환경변수로 넣습니다. 모니터는 \`datadog_monitor\` 리소스입니다.

\`\`\`hcl
resource "datadog_monitor" "checkout_cpu" {
  name    = "[checkout] CPU 사용률 높음"
  type    = "metric alert"
  query   = "avg(last_5m):avg:system.cpu.user{service:checkout} > 80"
  message = "checkout CPU 80% 초과 @slack-oncall"
  monitor_thresholds { critical = 80 }
}
\`\`\`

- SLO는 \`datadog_service_level_objective\`, Synthetics는 \`datadog_synthetics_test\` 리소스.
- 서비스 목록을 \`for_each\`로 돌리면 **모니터 템플릿**이 됩니다.

## 대시보드는 JSON으로

- 대시보드 설정(⚙) 메뉴에 **Copy dashboard JSON**·**Export dashboard JSON**·**Import dashboard JSON**이 있습니다. Import는 기존 내용을 덮어씁니다.
- Terraform에서는 \`datadog_dashboard_json\` 리소스에 \`dashboard = file("checkout.json")\`으로 넘깁니다. UI에서 만들고 → JSON → 코드로 봉인하는 흐름을 씁니다.

## 마무리: 6강의 복습 동선

이 카테고리는 **Docker 입문 → Docker 실전 → Kubernetes 입문 → Datadog 입문 → Kubernetes 운영 → Datadog 심화** 순서였습니다.

- "Kubernetes 운영"의 카나리 배포 + SLO·번 레이트 → **SLO 기반 자동 롤백**.
- "Datadog 입문"의 통합 서비스 태깅 + SSI·서비스 맵 → 태그 세 개가 모든 것의 열쇠.
- "Docker 실전"의 취약점 스캔 + Software Catalog Security 뷰 → 이미지부터 서비스까지 보안 시야.

다음 단계는 **연습**입니다. 내 서비스 하나에 SLO와 번 레이트 알림을 붙이고, 팀과 게임데이(가짜 장애 리허설)를 해 보세요.

> 💡 **핵심**: 모니터·SLO·대시보드도 배포 산출물입니다. Terraform과 JSON으로 코드화하면 리뷰·재현·롤백이 생기고, 관측 체계가 사람 기억이 아닌 저장소에 남습니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "terraform — datadog 관측 자산 배포",
            lines: [
              { text: "terraform plan -var-file=prod.tfvars", tone: "cmd" },
              { text: "# datadog_monitor.checkout_cpu will be created", tone: "comment" },
              { text: "  + type  = \"metric alert\"", tone: "out" },
              { text: "  + query = \"avg(last_5m):avg:system.cpu.user{service:checkout} > 80\"", tone: "out" },
              { text: "# datadog_service_level_objective.checkout_availability will be created", tone: "comment" },
              { text: "  + target = 99.9  (timeframe 30d)", tone: "out" },
              { text: "# datadog_dashboard_json.checkout will be updated in-place", tone: "comment" },
              { text: "Plan: 2 to add, 1 to change, 0 to destroy.", tone: "dim" },
              { text: "terraform apply -auto-approve -var-file=prod.tfvars", tone: "cmd" },
              { text: "Apply complete! Resources: 2 added, 1 changed, 0 destroyed.", tone: "ok" },
            ],
            caption: "plan 출력이 곧 변경 리뷰 문서입니다 — 임계값 80이 90으로 바뀌는 것도 PR에서 보입니다.",
          },
        },
      ],
    },
  ],
};
