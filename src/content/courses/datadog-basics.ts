import type { Course } from "../types";

/**
 * Datadog 입문 (인프라 & DevOps 4/6단계) — Docker를 조금 다뤄 본 사람이 서비스 모니터링을 처음 시작하는 강의.
 *
 * 사실 검증 메모 (2026-09 기준 웹 검색):
 * - 무료 플랜: 호스트 5대, 메트릭 보존 1일. Infrastructure Pro 호스트당 월 $15(연간), APM 호스트당 월 $31(연간, Infrastructure 필요),
 *   로그 인제스트 GB당 $0.10 + 표준 인덱스 백만 이벤트당 $1.70(15일 보존). 전 제품 2주 무료 체험 (datadoghq.com/pricing)
 * - 사이트(리전): US1 datadoghq.com / US3 us3.datadoghq.com / US5 us5.datadoghq.com / EU1 datadoghq.eu / AP1 ap1.datadoghq.com /
 *   AP2 ap2.datadoghq.com / UK1 uk1.datadoghq.com / US1-FED ddog-gov.com. 가입 시 선택, 이후 변경 불가·사이트 간 데이터 공유 불가 (docs.datadoghq.com/getting_started/site)
 * - API 키: Organization Settings > API Keys (기본 50개 한도). 앱 키: Organization Settings > Application Keys, 생성자 권한 상속·스코프 지정 가능 (docs.datadoghq.com/account_management/api-app-keys)
 * - Agent 7 리눅스 한 줄 설치: DD_API_KEY / DD_SITE 환경변수 + install_script_agent7.sh. 상태 확인 `sudo datadog-agent status`.
 *   설정 파일 /etc/datadog-agent/datadog.yaml, 체크 설정 /etc/datadog-agent/conf.d/ (docs.datadoghq.com/agent/configuration)
 * - 통합 서비스 태깅: env·service·version 예약 태그, DD_ENV/DD_SERVICE/DD_VERSION 환경변수, Kubernetes 레이블 tags.datadoghq.com/env|service|version,
 *   Agent 7.19+ (docs.datadoghq.com/getting_started/tagging/unified_service_tagging)
 * - UI 경로: Infrastructure > Hosts(Infrastructure List, 기본 최근 15분 활동 호스트), Infrastructure > Host Map(육각형=호스트, 색=CPU 기본, Fill by/Size by/Group by),
 *   Infrastructure > Containers, Logs > Configuration > Indexes, Monitors > New Monitor, Dashboards > New Dashboard → Add Widgets(위젯 트레이).
 *   Log Explorer는 Logs 메뉴(app.datadoghq.com/logs), Live Tail은 Log Explorer 시간 범위 드롭다운, On-Call은 app.datadoghq.com/on-call(On-Call > Teams),
 *   Plan & Usage는 왼쪽 아래 계정 메뉴 — 검수(2026-09-30)에서 공식 문서 기준으로 정정
 * - Docker Agent 실행: docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro
 *   -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE -e DD_API_KEY gcr.io/datadoghq/agent:7. 컨테이너 안 상태 확인 `docker exec -it dd-agent agent status`
 * - 오토디스커버리 현재 문법(Agent 7.36+): Docker 라벨 com.datadoghq.ad.checks / com.datadoghq.ad.logs, Kubernetes 어노테이션 ad.datadoghq.com/<컨테이너>.checks,
 *   템플릿 변수 %%host%% (docs.datadoghq.com/containers/docker/integrations, /containers/kubernetes/integrations)
 * - Datadog Operator: helm repo add datadog https://helm.datadoghq.com → helm install datadog-operator datadog/datadog-operator → kubectl create secret generic datadog-secret
 *   --from-literal api-key=… → DatadogAgent CR(apiVersion datadoghq.com/v2alpha1, spec.global.site / clusterName / credentials.apiSecret.secretName·keyName,
 *   spec.features.logCollection.enabled·containerCollectAll, spec.features.apm.enabled). Operator v1.0.0+·Helm 차트 v2.7.0+에서 Cluster Agent 기본 활성.
 *   Operator Helm 차트 watchNamespaces 기본값 []=모든 네임스페이스 감시 (docs.datadoghq.com/containers/kubernetes/installation, github.com/DataDog/helm-charts)
 * - 로그 수집: datadog.yaml `logs_enabled: true` + conf.d/<통합>.d/conf.yaml(logs: type file/path/service/source). Docker: DD_LOGS_ENABLED=true,
 *   DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true, DD_CONTAINER_EXCLUDE="name:datadog-agent", /var/lib/docker/containers·/opt/datadog-agent/run 마운트.
 *   Agent 7.19+ HTTPS 전송 기본 (docs.datadoghq.com/agent/logs, /containers/docker/log)
 * - 로그 인덱스: Exclusion Filter로 제외된 로그는 인덱스되지 않지만 Live Tail·메트릭 생성·아카이브는 가능. 일일 쿼터(기본 14:00 UTC 리셋, 경고 임계 50%~),
 *   보존 기간 선택지는 계약(account configuration)에 따라 다름 — 본문은 "3·7·15·30일 등, 계약에 따라 다름"으로 완곡 표기.
 *   Live Tail은 인덱스 여부와 무관하게 인제스트된 모든 로그를 실시간 표시 (docs.datadoghq.com/logs/log_configuration/indexes, /logs/explorer/live_tail)
 * - 로그 검색 문법: 예약 속성 host/service/status/source는 @ 없이, 커스텀 속성은 @ 접두(@http.status_code:5*, [500 TO 599], >100), AND/OR/-, 와일드카드 *·?.
 *   Patterns 뷰는 Log Explorer의 Group into > Patterns, 최대 10,000개 샘플 (docs.datadoghq.com/logs/explorer/search_syntax, /logs/explorer/analytics/patterns)
 * - 메트릭 타입: COUNT/RATE/GAUGE/HISTOGRAM/DISTRIBUTION(+SET). HISTOGRAM은 기본 .avg/.count/.median/.95percentile/.max 5개 파생.
 *   DogStatsD로 보낸 COUNT는 in-app RATE로 표시, Agent 체크·API로 보낸 COUNT는 COUNT 유지 (docs.datadoghq.com/metrics/types)
 * - 대시보드 위젯: Timeseries(line/area/bars), Query Value, Top List, Table, Heatmap, Distribution, Change, Pie, Notes, Group, SLO. Add Widgets → 편집 → Save (docs.datadoghq.com/dashboards)
 * - 모니터 종류: Host/Metric/Anomaly/Outlier/Forecast/Change Alert/Composite/Logs/APM/Event/Process/Network/Integration/Synthetic/RUM/Watchdog/SLO Alerts 등.
 *   설정: Alert·Warning threshold, Alert/Warning recovery threshold, 평가 윈도우(rolling 5분~1개월), Evaluation delay, No Data 옵션(Evaluate as zero / Show last known status /
 *   Show NO DATA / Show NO DATA and notify / Show OK), Renotify(alert·no data·warn 상태, N회 후 중단), Priority P1~P5.
 *   이상 탐지 알고리즘 basic/agile/robust, 계절성 hourly/daily/weekly, 과거 데이터 계절성의 3배 필요 (docs.datadoghq.com/monitors)
 * - 알림 문법: @slack-<채널>(계정 여러 개면 @slack-<계정>-<채널>), @pagerduty-<서비스>, @webhook-<이름>, @<이메일>, @oncall-<팀 핸들>.
 *   조건 블록 {{#is_alert}}/{{#is_warning}}/{{#is_recovery}}/{{#is_no_data}}/{{#is_renotify}}, 변수 {{value}} {{threshold}} {{host.name}} (docs.datadoghq.com/monitors/notify)
 * - Datadog On-Call: Datadog 자체 온콜·페이징 제품(2024-06 공개 보도자료 "launches", 좌석 기반 SKU). Teams·Schedules·Escalation Policies·Routing Rules, Page 상태 Triggered/Acknowledged/Resolved
 *   (docs.datadoghq.com/incident_response/on-call, datadoghq.com/blog/datadog-on-call)
 * - 커스텀 메트릭 과금: 메트릭 이름+태그 값 조합 1개 = 1개. Pro 호스트당 100개·Enterprise 200개 포함(조직 전체 합산). HISTOGRAM·DISTRIBUTION은 조합당 5개(퍼센타일 켜면 10개).
 *   월 평균(시간별 고유 개수) 기준 과금. Metrics without Limits로 인제스트/인덱스 태그 분리 (docs.datadoghq.com/account_management/billing/custom_metrics)
 * - 요금·한도는 변동 → 본문에 "2026년 9월 기준, 공식 요금 페이지 확인" 명시
 */
export const datadogBasics: Course = {
  slug: "datadog-basics",
  title: "Datadog 입문: 서비스 모니터링 시작하기",
  subtitle: "서버·컨테이너·Kubernetes의 메트릭과 로그를 한 화면에 모으고, 장애가 나면 먼저 알게 되는 법",
  description:
    "배포는 했는데 서비스가 지금 멀쩡한지는 어떻게 알까요? 사용자가 트위터에 올리기 전에 내가 먼저 알아야 합니다. 이 강의는 Docker를 조금 다뤄 본 사람이 Datadog으로 모니터링을 처음 시작하는 과정을 순서대로 따라갑니다. 계정 만들기와 Datadog Agent 설치, 호스트·컨테이너·Kubernetes 통합, 로그 수집과 검색, 대시보드와 알림, 그리고 청구서를 폭탄으로 만들지 않는 비용 관리까지 — 명령어와 버튼 위치까지 구체적으로 안내합니다.",
  category: "devops",
  level: "intermediate",
  tags: ["Datadog", "관측가능성", "모니터링", "로그 관리", "대시보드", "알림"],
  gradient: ["#7c3aed", "#4c1d95"],
  icon: "activity",
  outcomes: [
    "메트릭·로그·트레이스 3가지 신호의 차이를 설명하고, 모니터링과 관측가능성을 구분할 수 있다",
    "리눅스 서버·Docker·Kubernetes에 Datadog Agent를 설치하고 통합 서비스 태깅을 적용할 수 있다",
    "로그 수집을 켜고 인제스트와 로그 인덱스를 구분해 검색·패턴·Live Tail로 원인을 찾을 수 있다",
    "메트릭 타입을 이해하고 대시보드와 Datadog 모니터를 만들어 Slack·PagerDuty로 알림을 보낼 수 있다",
    "커스텀 메트릭·카디널리티·로그 인덱스 비용의 원리를 알고 청구서 폭탄을 예방할 수 있다",
  ],
  modules: [
    {
      slug: "observability-and-datadog",
      title: "관측가능성과 Datadog",
      description: "3가지 신호, Datadog 제품군과 요금, 첫 Datadog Agent 설치, 태깅 규칙",
      lessons: [
        {
          slug: "monitoring-vs-observability",
          title: "모니터링 vs 관측가능성: 3가지 신호(메트릭·로그·트레이스)",
          minutes: 5,
          content: `"서버는 살아 있는데 왜 결제가 안 되죠?" — 이 질문에 답하지 못하는 순간, 모니터링만으로는 부족하다는 걸 깨닫게 됩니다.

## 모니터링과 관측가능성은 무엇이 다른가

- **모니터링**: 미리 정한 질문에 답합니다. "CPU가 90%를 넘었나?", "서버가 응답하나?" — **아는 문제**를 감시합니다.
- **관측가능성**: 처음 보는 문제도 추적할 수 있습니다. "어제 배포 후 특정 사용자만 느려진 이유가 뭐지?" — **모르는 문제**를 파고듭니다.

자동차에 비유하면, 모니터링은 계기판의 경고등이고 관측가능성은 정비소의 진단 스캐너입니다. 경고등은 "뭔가 이상하다"까지만 알려 주지만, 스캐너를 꽂으면 어느 부품이 언제부터 어떻게 이상했는지 나옵니다.

## 3가지 신호

관측가능성은 시스템이 바깥으로 내보내는 세 종류의 신호 위에 서 있습니다.

- **메트릭** — 숫자의 시간 흐름. 값이 싸고 가벼워 **"지금 이상한가"**를 가장 빨리 알려 줍니다.
- **로그** — 사건의 기록. **"무슨 일이 있었나"**를 문장으로 말해 줍니다.
- **트레이스** — 요청 하나의 여행 경로. 여러 서비스를 거치는 요청이 **"어디서 시간을 썼나"**를 스팬 단위로 보여 줍니다.

셋을 같은 태그로 묶어 넘나들 수 있을 때 비로소 관측가능성이 생깁니다. 이것이 Datadog이 잘하는 일입니다.

## 이 강의의 로드맵

1. **모듈 1** — Datadog이 무엇이고 얼마인지, 계정 만들고 Datadog Agent 설치, 태깅 규칙
2. **모듈 2** — 호스트·Docker·Kubernetes를 붙이고, 로그를 모아 검색하기
3. **모듈 3** — 대시보드와 Datadog 모니터를 만들고 Slack으로 알림 받기, 비용 관리

이 강의는 메트릭과 로그에 집중합니다. 트레이스(APM)는 다음 강의 "Datadog 심화: APM·SLO·인시던트 운영"에서 다룹니다.

> 💡 **핵심**: 모니터링은 "아는 문제"를 감시하고, 관측가능성은 "모르는 문제"를 추적합니다. 그 재료가 메트릭·로그·트레이스 세 신호입니다.`,
          illustration: {
            type: "compare",
            title: "모니터링 vs 관측가능성",
            columns: [
              {
                title: "모니터링 (계기판 경고등)",
                icon: "alert",
                tone: "muted",
                items: [
                  "미리 정한 질문에만 답함",
                  "CPU 90% 초과? 서버 응답?",
                  "이상하다는 사실까지만",
                  "대시보드 + 임계값 알림",
                ],
              },
              {
                title: "관측가능성 (진단 스캐너)",
                icon: "search",
                tone: "primary",
                items: [
                  "처음 보는 질문도 추적",
                  "왜 특정 사용자만 느린가?",
                  "어디서·언제부터·왜까지",
                  "메트릭·로그·트레이스 연결",
                ],
              },
            ],
            caption: "관측가능성은 도구가 아니라 '세 신호를 같은 태그로 넘나들 수 있는 상태'입니다.",
          },
        },
        {
          slug: "datadog-at-a-glance",
          title: "Datadog 한눈에: 제품군·요금 구조·무료 플랜",
          minutes: 5,
          content: `Datadog 요금 페이지에는 제품이 스무 개쯤 나열돼 있어 어디서 시작할지 막막합니다. 구조만 알면 필요한 것만 골라 쓸 수 있습니다.

## 제품군: 한 플랫폼, 여러 조각

Datadog은 한 계정 안에서 제품을 조각처럼 골라 켭니다. 핵심 조각은 이렇습니다.

- **Infrastructure** — 호스트·컨테이너 메트릭. 이 강의의 토대.
- **Log Management** — 로그 수집·검색·보관.
- **APM** — 트레이스와 코드 수준 성능 분석 (다음 강의).
- **RUM · Synthetics** — 실사용자와 로봇 관점 감시 (다음 강의).
- **Cloud Security · Cloud SIEM · On-Call · Incident Response** — 보안·장애 대응.

## 요금 구조: 기본료 + 종량제

휴대폰 요금제처럼 제품마다 **기준 단위**가 다르고, 그 단위로 과금됩니다.

- Infrastructure와 APM은 **호스트 수** 기준
- 로그는 **인제스트 용량(GB)** 과 **로그 인덱스 건수**로 따로 과금
- 커스텀 메트릭은 호스트당 일정 개수 포함, 초과분 별도(마지막 레슨)

2026년 9월 기준 Infrastructure Pro 호스트당 월 15달러부터(연간 결제), APM 호스트당 월 31달러부터(연간, Infrastructure 필요), 로그 인제스트 GB당 0.10달러 + 인덱스 백만 건당 1.70달러(15일 보존). 요금은 자주 바뀌니 **공식 요금 페이지에서 반드시 확인**하세요.

## 무료 플랜과 체험

- **Free 플랜**: 호스트 **5대**, 메트릭 보존 **1일**, 핵심 대시보드·통합 제공. 로그·APM·RUM·Synthetics·보안은 미포함.
- 가입 직후 전 제품 **2주 무료 체험**. 이 강의의 로그 실습은 그 안에 끝내면 무료입니다.

> 💡 **핵심**: Datadog은 "제품 조각 × 각자의 과금 단위"입니다. Infrastructure(호스트)부터 시작하고, 로그는 인제스트와 인덱스가 따로 과금된다는 것만 기억하세요.`,
          illustration: {
            type: "grid",
            title: "Datadog 제품 지도와 과금 단위",
            items: [
              { label: "Infrastructure", sublabel: "호스트당 · 이 강의의 토대", icon: "server", tone: "primary" },
              { label: "Log Management", sublabel: "인제스트 GB + 인덱스 건수", icon: "file-text", tone: "primary" },
              { label: "APM", sublabel: "호스트당 · 다음 강의", icon: "activity", tone: "accent" },
              { label: "RUM · Synthetics", sublabel: "세션·테스트 횟수 · 다음 강의", icon: "globe", tone: "accent" },
              { label: "Security · SIEM", sublabel: "호스트·로그 용량", icon: "shield", tone: "muted" },
              { label: "On-Call · Incident", sublabel: "사용자 좌석", icon: "siren", tone: "muted" },
            ],
            caption: "제품마다 과금 단위가 다릅니다 — 청구서를 읽으려면 단위부터 알아야 합니다.",
          },
        },
        {
          slug: "signup-and-agent-install",
          title: "계정 만들기와 Datadog Agent 설치",
          minutes: 7,
          content: `서버에는 **수거원**이 필요합니다. 집배원이 우체통을 정해진 시간에 비우듯, Datadog Agent가 메트릭과 로그를 모아 Datadog으로 보냅니다.

## 1단계: 가입과 사이트 선택

1. datadoghq.com **Get Started Free**로 가입하며 **사이트(리전)** 를 고릅니다 — US1(datadoghq.com), US3, US5, EU1(datadoghq.eu), AP1(ap1.datadoghq.com) 등. **나중에 바꿀 수 없고** 사이트끼리 데이터를 공유하지 않습니다.
2. UI 주소가 곧 내 사이트(US1이면 app.datadoghq.com)이며, 설치 명령의 \`DD_SITE\`와 일치해야 합니다.

## 2단계: API 키 발급

왼쪽 아래 조직 메뉴 **Organization Settings > API Keys**에서 **New Key**를 누릅니다.

- **API 키** — Datadog Agent가 데이터를 **보낼 때** 쓰는 열쇠.
- **앱 키(Application Key)** — 스크립트·Terraform이 API를 **읽고 조작할 때** 쓰는 열쇠(**Organization Settings > Application Keys**). 지금은 불필요.

## 3단계: 리눅스 서버에 한 줄 설치

\`\`\`bash
DD_API_KEY=<발급한 키> DD_SITE="datadoghq.com" \\
  bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
\`\`\`

\`sudo datadog-agent status\`의 **Running Checks**에 cpu·disk·memory·network가 보이면 성공입니다. 설정 파일은 \`/etc/datadog-agent/datadog.yaml\`입니다. 몇 분 뒤 **Infrastructure > Hosts**에 서버가 뜹니다.

**여기서 막힌다면**

- Forwarder에 \`API Key invalid\`면 키 오타입니다. datadog.yaml의 \`api_key\`를 확인하세요.
- UI에 호스트가 없다면 **사이트 불일치**입니다. EU 계정인데 \`DD_SITE\`를 비우면 US1로 갑니다.
- \`Permission denied\`는 \`sudo\` 없이 실행한 것입니다.

> 💡 **핵심**: 사이트 선택 → API 키 → 한 줄 설치 → \`datadog-agent status\`. 문제의 8할은 사이트 불일치와 키 오타입니다.`,
          illustration: {
            type: "steps",
            title: "첫 데이터가 들어오기까지 5단계",
            steps: [
              { label: "가입 + 사이트 선택", sublabel: "US1·EU1·AP1 — 나중에 변경 불가", icon: "globe" },
              { label: "API 키 발급", sublabel: "Organization Settings > API Keys", icon: "key" },
              { label: "한 줄 설치", sublabel: "DD_API_KEY + DD_SITE + install_script", icon: "terminal" },
              { label: "상태 확인", sublabel: "sudo datadog-agent status", icon: "check" },
              { label: "UI에서 확인", sublabel: "Infrastructure > Hosts", icon: "server" },
            ],
            caption: "설치 명령의 DD_SITE와 가입 시 고른 사이트가 어긋나면 데이터는 다른 나라로 갑니다.",
          },
          demo: {
            title: "터미널에서 Datadog Agent 설치하고 상태 확인하기",
            app: {
              kind: "code-editor",
              windowTitle: "datadog.yaml — web-01 서버",
              files: [
                { id: "f-yaml", name: "/etc/datadog-agent/datadog.yaml", active: true },
                { id: "f-confd", name: "conf.d/" },
              ],
              code: [
                { id: "c1", text: "# Datadog Agent 7 메인 설정 (설치 스크립트가 생성)", tone: "comment" },
                { id: "c2", text: "api_key: ****************************a1b2", hidden: true },
                { id: "c3", text: "site: datadoghq.com", hidden: true },
                { id: "c4", text: "# logs_enabled: true   ← 로그 수집은 모듈 2에서", tone: "comment", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "export DD_API_KEY=<발급한 API 키>", tone: "cmd", hidden: true },
                { id: "t2", text: "export DD_SITE=datadoghq.com", tone: "cmd", hidden: true },
                { id: "t3", text: "bash -c \"$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)\"", tone: "cmd", hidden: true },
                { id: "t4", text: "* Installing the Datadog Agent package (agent 7)", tone: "out", hidden: true },
                { id: "t5", text: "* Adding your API key to the Agent configuration: /etc/datadog-agent/datadog.yaml", tone: "out", hidden: true },
                { id: "t6", text: "Your Agent is running and functioning properly.", tone: "ok", hidden: true },
                { id: "t7", text: "sudo datadog-agent status", tone: "cmd", hidden: true },
                { id: "t8", text: "Agent (v7.x) — Hostname: web-01 — Status date: 2026-09-30", tone: "out", hidden: true },
                { id: "t9", text: "Running Checks: cpu · disk · memory · network · uptime", tone: "ok", hidden: true },
                { id: "t10", text: "Forwarder: Transactions Success 42, API Key valid", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 가입 시 사이트(US1)를 고르고 Organization Settings > API Keys에서 키를 복사합니다" },
              { t: "caption", text: "② 서버 터미널에서 API 키와 사이트를 환경변수로 넣습니다" },
              { t: "type", target: "t1", text: "export DD_API_KEY=<발급한 API 키>" },
              { t: "type", target: "t2", text: "export DD_SITE=datadoghq.com" },
              { t: "caption", text: "③ 공식 설치 스크립트 한 줄을 실행합니다" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "reveal", target: "t6" },
              { t: "caption", text: "④ 설치 스크립트가 만든 설정 파일을 확인합니다" },
              { t: "move", target: "f-yaml" },
              { t: "click" },
              { t: "reveal", target: "c2" },
              { t: "reveal", target: "c3" },
              { t: "reveal", target: "c4" },
              { t: "move", target: "c3" },
              { t: "caption", text: "⑤ 상태 명령으로 Running Checks와 API 키 유효성을 확인합니다" },
              { t: "type", target: "t7", text: "sudo datadog-agent status" },
              { t: "reveal", target: "t8" },
              { t: "reveal", target: "t9" },
              { t: "reveal", target: "t10" },
              { t: "move", target: "t10" },
              { t: "caption", text: "✅ 몇 분 뒤 Infrastructure > Hosts에 web-01이 나타납니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "unified-service-tagging",
          title: "통합 서비스 태깅: env·service·version 세 태그의 힘",
          minutes: 5,
          content: `Datadog Agent를 열 대에 깔았는데 어느 그래프가 어느 서비스의 것인지 알 수 없다면, 데이터는 많아도 정보는 없는 상태입니다. 처음부터 **태그 규칙**을 잡아야 합니다.

## 태그란 무엇인가

태그는 데이터에 붙이는 \`키:값\` 꼬리표입니다. \`env:prod\`, \`service:checkout\`, \`region:ap-northeast-2\`처럼요. 도서관의 청구기호를 떠올리면 됩니다. 어느 서가에 있든 청구기호만 같으면 같은 책으로 묶어 찾을 수 있듯, 태그가 같으면 메트릭·로그·트레이스를 **한 필터로 함께** 조회할 수 있습니다.

## 통합 서비스 태깅: 예약된 세 태그

Datadog은 세 태그를 특별 취급합니다. 이 세 개만 통일하면 화면 사이를 넘나들 때 필터가 자동으로 따라옵니다.

- **env** — 환경. \`prod\`, \`staging\`, \`dev\`
- **service** — 서비스 이름. \`checkout\`, \`web\`, \`payment-api\`
- **version** — 배포 버전. \`1.4.2\` 또는 커밋 해시. **배포 직후 에러가 늘었는지**를 버전별로 갈라 보는 열쇠입니다.

## 어떻게 붙이나

앱 코드를 고칠 필요는 없습니다. 실행 환경에 **환경변수** 세 개를 넣거나 레이블을 붙이면 Datadog Agent와 라이브러리가 자동으로 읽어 갑니다.

\`\`\`bash
# Docker: 환경변수로
docker run -d --name checkout \\
  -e DD_ENV=prod -e DD_SERVICE=checkout -e DD_VERSION=1.4.2 \\
  myorg/checkout:1.4.2
\`\`\`

\`\`\`yaml
# Kubernetes: 파드 템플릿 레이블로 (디플로이먼트 spec.template.metadata.labels)
labels:
  tags.datadoghq.com/env: "prod"
  tags.datadoghq.com/service: "checkout"
  tags.datadoghq.com/version: "1.4.2"
\`\`\`

세 값은 **소문자·하이픈** 위주로 짓고, 팀 전체가 같은 이름을 쓰도록 문서로 고정하세요. \`Checkout\`과 \`checkout\`은 Datadog에서 다른 서비스입니다.

> 💡 **핵심**: env·service·version 세 태그를 모든 것에 똑같이 붙이세요. 이 규칙 하나가 이후 모든 화면의 필터를 자동으로 연결합니다.`,
          illustration: {
            type: "flow",
            title: "세 태그가 세 신호를 연결하는 과정",
            nodes: [
              { label: "실행 환경에 세 값 설정", sublabel: "DD_ENV · DD_SERVICE · DD_VERSION", icon: "settings", tone: "primary" },
              { label: "Datadog Agent가 자동 부착", sublabel: "메트릭·로그·트레이스 모두에 같은 태그", icon: "activity", tone: "accent", edgeLabel: "코드 수정 없음" },
              { label: "어느 화면이든 같은 필터", sublabel: "env:prod service:checkout", icon: "filter", tone: "accent" },
              { label: "배포 전후 비교", sublabel: "version:1.4.1 vs version:1.4.2", icon: "git-branch", tone: "success", edgeLabel: "한 클릭 이동" },
            ],
            caption: "태그는 나중에 붙이기가 가장 어렵습니다 — Datadog Agent를 깔기 전에 이름 규칙부터 정하세요.",
          },
        },
      ],
    },
    {
      slug: "infrastructure-and-logs",
      title: "인프라와 로그",
      description: "호스트·Docker·Kubernetes 통합, 로그 수집과 검색",
      lessons: [
        {
          slug: "infrastructure-monitoring",
          title: "호스트·컨테이너 보기: Infrastructure List와 Host Map",
          minutes: 5,
          content: `Datadog Agent가 데이터를 보내기 시작했습니다. 이제 "서버 50대 중 지금 힘든 놈이 누구인가"를 3초 안에 찾는 화면을 익힙니다.

## Infrastructure List: 명단

**Infrastructure > Hosts**에 Datadog Agent나 클라우드 통합으로 보고 중인 모든 호스트가 나열됩니다.

- 기본으로 **최근 15분 안에 활동한 호스트**만 보입니다. 죽은 서버는 조용히 사라집니다 — 나중에 만들 Host 모니터가 그걸 잡아 줍니다.
- 컬럼은 CPU·IOWait·Load 같은 메트릭, 태그, 설치 소프트웨어, 통합 등으로 바꿀 수 있습니다.
- 검색창에 \`env:prod\` 같은 태그로 거르고, 호스트를 클릭하면 오른쪽에 **상세 패널**이 열립니다. 별칭·태그·컨테이너·로그·Datadog Agent 설정(JSON)이 여기 있습니다.

## Host Map: 지도

**Infrastructure > Host Map**은 같은 호스트들을 **육각형 타일**로 그립니다. 아파트 관리사무소의 세대별 전력 현황판처럼, 어느 집이 과열됐는지 색으로 보입니다.

- 색은 기본으로 **CPU 사용률**. 초록(여유)에서 주황·빨강(포화)으로.
- **Fill by**로 색의 기준 메트릭을, **Size by**로 타일 크기의 기준을 바꿉니다.
- **Group by**에 \`availability-zone\`, \`service\` 같은 태그를 넣으면 그룹별로 모입니다. 한 존만 붉다면 원인은 그 존에 있습니다.

## Containers: 살아 있는 컨테이너 목록

**Infrastructure > Containers**는 컨테이너 단위 실시간 목록입니다. CPU·메모리·RSS·네트워크가 **2초 해상도**로 갱신되고, 제한(limit)이 있으면 그 대비 비율로 표시됩니다. 클릭하면 로그 Live Tail도 열립니다.

> 💡 **핵심**: 명단(Hosts)으로 찾고, 지도(Host Map)로 패턴을 보고, Containers로 파고듭니다. Group by 태그 하나가 "어디가 문제인가"를 색으로 답합니다.`,
          illustration: {
            type: "compare",
            title: "Infrastructure List vs Host Map",
            columns: [
              {
                title: "Hosts (명단)",
                icon: "clipboard",
                tone: "accent",
                items: [
                  "표 형태, 컬럼 자유 구성",
                  "최근 15분 활동 호스트",
                  "태그·메트릭 값으로 필터",
                  "클릭 → 상세 패널",
                ],
              },
              {
                title: "Host Map (지도)",
                icon: "layers",
                tone: "primary",
                items: [
                  "육각형 타일, 색 = CPU 기본",
                  "Fill by · Size by 로 기준 변경",
                  "Group by 태그로 묶어 보기",
                  "한 그룹만 붉으면 원인 위치 확정",
                ],
              },
              {
                title: "Containers (실시간)",
                icon: "container",
                tone: "muted",
                items: [
                  "컨테이너 단위 2초 갱신",
                  "limit 대비 CPU·메모리 비율",
                  "Kubernetes 태그 자동 부착",
                  "클릭 → 로그 Live Tail",
                ],
              },
            ],
            caption: "같은 데이터, 세 가지 시선 — 질문이 '누가'면 명단, '어디가'면 지도입니다.",
          },
        },
        {
          slug: "docker-monitoring",
          title: "Docker 컨테이너 모니터링: Agent 컨테이너 실행과 오토디스커버리",
          minutes: 6,
          content: `Docker를 쓰는 서버라면 Datadog Agent 자체를 **컨테이너로** 띄우는 것이 표준입니다.

## Datadog Agent 컨테이너 실행

\`\`\`bash
docker run -d --cgroupns host --pid host --name dd-agent \\
  -v /var/run/docker.sock:/var/run/docker.sock:ro \\
  -v /proc/:/host/proc/:ro \\
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \\
  -e DD_SITE=datadoghq.com \\
  -e DD_API_KEY=<발급한 키> \\
  gcr.io/datadoghq/agent:7
\`\`\`

바인드 마운트 세 개가 핵심입니다. \`docker.sock\`으로 **어떤 컨테이너가 뜨고 지는지**를 데몬에게 직접 묻고, \`/proc\`와 \`/sys/fs/cgroup\`으로 호스트와 컨테이너의 CPU·메모리를 읽습니다. 모두 읽기 전용(\`:ro\`)입니다. 상태 확인은 \`docker exec -it dd-agent agent status\`입니다.

## 오토디스커버리: 새 손님을 자동으로 알아보기

호텔 프런트는 손님이 체크인하면 묻지 않아도 방을 배정하고 룸서비스를 연결합니다. 오토디스커버리도 같습니다. 컨테이너가 새로 뜨면 Datadog Agent가 docker.sock으로 알아채고, 컨테이너의 **라벨**을 읽어 알맞은 수집 설정을 스스로 적용합니다. 컨테이너가 사라지면 설정도 함께 사라집니다.

Redis 컨테이너에 라벨을 붙이는 현재 문법(Datadog Agent 7.36 이상)입니다.

\`\`\`yaml
# compose.yaml 의 서비스 정의 일부
services:
  cache:
    image: redis:7
    labels:
      com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%", "port": "6379"}]}}'
      com.datadoghq.ad.logs: '[{"source": "redis", "service": "cache"}]'
\`\`\`

- \`com.datadoghq.ad.checks\` — 어떤 통합(redisdb)을 어떤 설정으로 켤지. \`%%host%%\`는 그 컨테이너의 IP로 치환되는 템플릿 변수입니다.
- \`com.datadoghq.ad.logs\` — 이 컨테이너 로그의 \`source\`(파서 선택)와 \`service\`(태그).

Kubernetes에서는 같은 내용을 파드 어노테이션 \`ad.datadoghq.com/<컨테이너 이름>.checks\`로 씁니다.

**여기서 막힌다면**

- \`agent status\`의 Autodiscovery 항목에 컨테이너가 없다면 docker.sock 마운트를 빠뜨렸거나 \`:ro\` 권한 문제입니다.
- 라벨은 넣었는데 통합이 안 켜지면 대부분 JSON 따옴표 오류입니다. 라벨 값은 **작은따옴표로 감싼 JSON**이어야 합니다.

> 💡 **핵심**: Datadog Agent 컨테이너는 docker.sock으로 세상을 봅니다. 라벨 두 줄만 붙이면 컨테이너가 뜰 때마다 수집 설정이 따라옵니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "docker — Datadog Agent 컨테이너",
            lines: [
              { text: "docker run -d --cgroupns host --pid host --name dd-agent \\", tone: "cmd" },
              { text: "  -v /var/run/docker.sock:/var/run/docker.sock:ro ... gcr.io/datadoghq/agent:7", tone: "cmd" },
              { text: "3f9c1e7a2b...  (컨테이너 ID)", tone: "dim" },
              { text: "docker compose up -d cache", tone: "cmd" },
              { text: "✔ Container shop-cache-1  Started", tone: "ok" },
              { text: "docker exec -it dd-agent agent status", tone: "cmd" },
              { text: "# Autodiscovery 가 라벨을 읽어 redisdb 체크를 자동 등록", tone: "comment" },
              { text: "Running Checks", tone: "out" },
              { text: "  redisdb (5.x)  Instance ID: redisdb:cache  [OK]", tone: "ok" },
              { text: "  docker (4.x)   containers running: 2  [OK]", tone: "ok" },
            ],
            caption: "컨테이너를 띄우기만 했는데 redisdb 체크가 생겼습니다 — 라벨이 설정 파일을 대신합니다.",
          },
        },
        {
          slug: "kubernetes-monitoring",
          title: "Kubernetes 통합: Datadog Operator로 Agent 배포",
          minutes: 7,
          content: `Kubernetes 클러스터는 노드가 수십 대이고 파드는 수시로 바뀝니다. 노드마다 명령어를 치는 대신, **Datadog Operator**에게 "이런 Datadog Agent를 유지해 줘"라고 선언합니다.

## 무엇이 배포되나

학교로 비유하면, 노드마다 있는 **Datadog Agent**(DaemonSet)는 각 교실의 담임처럼 그 노드의 파드와 컨테이너를 챙깁니다. 클러스터당 하나 있는 **Cluster Agent**는 교무실처럼 API 서버와 한 번만 대화해 클러스터 수준 정보를 모아 담임들에게 나눠 줍니다. Operator는 이 둘을 만들고 관리하는 교장입니다. Operator로 설치하면 Cluster Agent가 **기본으로 켜집니다**.

## 설치 4단계

\`\`\`bash
helm repo add datadog https://helm.datadoghq.com
helm install datadog-operator datadog/datadog-operator -n datadog --create-namespace
kubectl create secret generic datadog-secret -n datadog \\
  --from-literal api-key=<발급한 키>
\`\`\`

Helm으로 Operator를 설치하고, API 키는 Secret에 넣습니다. 그다음 **DatadogAgent** CRD 리소스 하나를 작성합니다.

\`\`\`yaml
# datadog-agent.yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    site: datadoghq.com
    clusterName: shop-prod
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
\`\`\`

\`kubectl apply -f datadog-agent.yaml\` 후 \`kubectl get pods -n datadog\`을 치면 노드 수만큼의 \`datadog-agent-…\` 파드와 \`datadog-cluster-agent-…\` 파드가 Running이 됩니다. \`kubectl get datadogagent -n datadog\`으로 전체 상태도 봅니다. 설정 변경은 YAML을 고쳐 다시 apply합니다.

**여기서 막힌다면**

- Datadog Agent 파드가 \`CreateContainerConfigError\`면 Secret 이름·키 이름(\`api-key\`)이 YAML과 다릅니다.
- 파드는 떴는데 UI에 클러스터가 없다면 \`site\`가 가입 사이트와 다릅니다.
- \`no matches for kind "DatadogAgent"\`는 Operator(CRD)가 아직 없는 상태입니다. Helm 설치를 먼저 확인하세요.

> 💡 **핵심**: Kubernetes에서는 명령 대신 선언입니다. DatadogAgent YAML 하나가 노드 Agent·Cluster Agent·로그 수집 설정을 모두 담고, Operator가 그 상태를 유지합니다.`,
          illustration: {
            type: "stack",
            title: "Datadog Operator가 만드는 계층",
            layers: [
              { label: "Datadog (SaaS)", sublabel: "site: datadoghq.com 으로 전송", icon: "cloud", tone: "muted" },
              { label: "Datadog Operator", sublabel: "DatadogAgent CR을 읽어 아래 둘을 생성·유지", icon: "settings", tone: "primary" },
              { label: "Cluster Agent (Deployment, 1개)", sublabel: "API 서버와 대화 · 클러스터 수준 메타데이터", icon: "network", tone: "accent" },
              { label: "Datadog Agent (DaemonSet, 노드마다 1개)", sublabel: "파드·컨테이너 메트릭·로그 수집", icon: "activity", tone: "accent" },
              { label: "내 애플리케이션 파드들", sublabel: "어노테이션으로 오토디스커버리", icon: "boxes", tone: "muted" },
            ],
            caption: "노드 Agent는 담임, Cluster Agent는 교무실, Operator는 교장 — 역할이 다르니 셋이 함께 갑니다.",
          },
          demo: {
            title: "DatadogAgent 리소스로 Kubernetes에 Agent 배포하기",
            app: {
              kind: "code-editor",
              windowTitle: "datadog-agent.yaml — shop-prod 클러스터",
              files: [
                { id: "f-cr", name: "datadog-agent.yaml", active: true },
                { id: "f-readme", name: "README.md" },
              ],
              code: [
                { id: "c1", text: "apiVersion: datadoghq.com/v2alpha1" },
                { id: "c2", text: "kind: DatadogAgent" },
                { id: "c3", text: "metadata:" },
                { id: "c4", text: "name: datadog", indent: 1 },
                { id: "c5", text: "namespace: datadog", indent: 1 },
                { id: "c6", text: "spec:" },
                { id: "c7", text: "global:", indent: 1 },
                { id: "c8", text: "site: datadoghq.com", indent: 2, tone: "add", hidden: true },
                { id: "c9", text: "clusterName: shop-prod", indent: 2, tone: "add", hidden: true },
                { id: "c10", text: "credentials:", indent: 2 },
                { id: "c11", text: "apiSecret:", indent: 3 },
                { id: "c12", text: "secretName: datadog-secret", indent: 4 },
                { id: "c13", text: "keyName: api-key", indent: 4 },
                { id: "c14", text: "features:", indent: 1, tone: "add", hidden: true },
                { id: "c15", text: "logCollection:", indent: 2, tone: "add", hidden: true },
                { id: "c16", text: "enabled: true", indent: 3, tone: "add", hidden: true },
                { id: "c17", text: "containerCollectAll: true", indent: 3, tone: "add", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "helm repo add datadog https://helm.datadoghq.com", tone: "cmd", hidden: true },
                { id: "t2", text: "helm install datadog-operator datadog/datadog-operator -n datadog --create-namespace", tone: "cmd", hidden: true },
                { id: "t3", text: "STATUS: deployed", tone: "ok", hidden: true },
                { id: "t4", text: "kubectl create secret generic datadog-secret -n datadog --from-literal api-key=<발급한 키>", tone: "cmd", hidden: true },
                { id: "t5", text: "secret/datadog-secret created", tone: "ok", hidden: true },
                { id: "t6", text: "kubectl apply -f datadog-agent.yaml", tone: "cmd", hidden: true },
                { id: "t7", text: "datadogagent.datadoghq.com/datadog created", tone: "ok", hidden: true },
                { id: "t8", text: "kubectl get pods -n datadog", tone: "cmd", hidden: true },
                { id: "t9", text: "datadog-agent-7xk2p           3/3  Running   (노드마다 1개)", tone: "out", hidden: true },
                { id: "t11", text: "datadog-cluster-agent-5c8f-tr2  1/1  Running", tone: "out", hidden: true },
                { id: "t12", text: "datadog-operator-6d9b-hk7   1/1  Running", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① Helm으로 Datadog Operator를 datadog 네임스페이스에 설치합니다" },
              { t: "reveal", target: "t1" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "caption", text: "② API 키를 Secret에 넣습니다 (YAML에 키를 직접 쓰지 않습니다)" },
              { t: "reveal", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "caption", text: "③ DatadogAgent 리소스에 사이트와 클러스터 이름을 채웁니다" },
              { t: "move", target: "c7" },
              { t: "type", target: "c8", text: "site: datadoghq.com" },
              { t: "type", target: "c9", text: "clusterName: shop-prod" },
              { t: "caption", text: "④ 로그 수집 기능을 선언합니다 — 모든 컨테이너 로그를 모읍니다" },
              { t: "reveal", target: "c14" },
              { t: "reveal", target: "c15" },
              { t: "type", target: "c16", text: "enabled: true" },
              { t: "type", target: "c17", text: "containerCollectAll: true" },
              { t: "caption", text: "⑤ apply 하면 Operator가 노드 Datadog Agent와 Cluster Agent를 만듭니다" },
              { t: "type", target: "t6", text: "kubectl apply -f datadog-agent.yaml" },
              { t: "reveal", target: "t7" },
              { t: "type", target: "t8", text: "kubectl get pods -n datadog" },
              { t: "reveal", target: "t9" },
              { t: "reveal", target: "t11" },
              { t: "reveal", target: "t12" },
              { t: "caption", text: "✅ 노드마다 datadog-agent, 클러스터에 하나 cluster-agent — Infrastructure > Kubernetes에서 확인" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "log-collection",
          title: "로그 수집: 인제스트와 로그 인덱스는 다르다",
          minutes: 5,
          content: `로그는 Datadog에서 **가장 비싸지기 쉬운 데이터**입니다. 관문을 알아야 청구서를 지킵니다.

## 두 관문: 인제스트와 로그 인덱스

CCTV 영상을 **수신**하는 것과 **녹화해 보관**하는 것은 다른 일입니다. Datadog 로그도 같습니다.

1. **인제스트** — 도착한 로그를 파이프라인에서 파싱·가공하는 단계. 용량(GB) 과금.
2. **로그 인덱스** — 검색·알림·대시보드용 저장 단계. **건수** 과금, 보존 기간(3·7·15·30일 등, 계약별 상이) 선택.

인덱스되지 않은 로그도 **Live Tail**·메트릭 생성·아카이브(S3 등)는 가능합니다.

## 수집 켜기

호스트의 Datadog Agent는 두 파일을 고칩니다.

\`\`\`yaml
# /etc/datadog-agent/datadog.yaml
logs_enabled: true

# /etc/datadog-agent/conf.d/nginx.d/conf.yaml
logs:
  - type: file
    path: /var/log/nginx/access.log
    service: web
    source: nginx
\`\`\`

\`source\`는 파서 선택, \`service\`는 통합 서비스 태깅의 그 값입니다. 재시작 후 \`datadog-agent status\`의 Logs Agent 항목에 파일이 보이면 됩니다.

Docker로 띄운 Datadog Agent는 \`-e DD_LOGS_ENABLED=true -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true\`와 \`/var/lib/docker/containers\` 읽기 전용 마운트를 더합니다.

**여기서 막힌다면**

- Logs Agent 항목이 비어 있다면 재시작을 빠뜨린 것입니다(\`sudo systemctl restart datadog-agent\`).
- \`permission denied\`는 실행 계정 \`dd-agent\`에 로그 파일 읽기 권한이 없는 것입니다.

## 인덱스 관문 지키기

**Logs > Configuration > Indexes**에서 인덱스마다 **Exclusion Filter**를 둡니다. 예: \`status:debug\` 100% 제외, 헬스체크(\`@http.url_details.path:/healthz\`) 95% 샘플링 제외. 제외분은 인덱스 요금이 없습니다. **Daily Quota**로 하루 상한도 걸어 두세요. 넘치면 인덱스만 멈추고 인제스트는 계속됩니다.

> 💡 **핵심**: 인제스트(받기)와 로그 인덱스(저장·검색)는 다른 관문이고 따로 과금됩니다. 전부 받되, 인덱스는 Exclusion Filter와 Daily Quota로 골라 담으세요.`,
          illustration: {
            type: "flow",
            title: "로그 한 줄이 지나는 관문",
            nodes: [
              { label: "앱·컨테이너 로그", sublabel: "Datadog Agent가 파일·stdout 수집", icon: "file-text", tone: "muted" },
              { label: "인제스트", sublabel: "GB 기준 과금 · 로그 파이프라인 파싱", icon: "download", tone: "primary", edgeLabel: "HTTPS 전송" },
              { label: "Exclusion Filter · Daily Quota", sublabel: "debug 100% 제외, 헬스체크 95% 샘플링", icon: "filter", tone: "warning" },
              { label: "로그 인덱스", sublabel: "건수 기준 과금 · 보존 기간 선택 · 검색·알림", icon: "database", tone: "success", edgeLabel: "통과한 로그만" },
            ],
            caption: "제외된 로그도 Live Tail·메트릭·아카이브에는 남습니다 — 버리는 게 아니라 '비싼 서랍'에 안 넣는 것입니다.",
          },
        },
        {
          slug: "log-search-and-patterns",
          title: "로그 검색·패턴·Live Tail: 장애 원인 5분 만에 찾기",
          minutes: 6,
          content: `새벽 2시, "결제가 안 돼요"라는 알림. 로그가 초당 수천 줄 쌓이는데 어디서부터 볼까요? 탐정의 소거법처럼 조건을 하나씩 더해 범위를 좁힙니다.

## 검색 문법: 소거의 도구

**Logs > Log Explorer**를 열고 검색창에 조건을 씁니다. 규칙은 둘입니다.

- **예약 속성**은 \`@\` 없이: \`service:checkout\`, \`status:error\`, \`host:web-01\`, \`source:nginx\`
- **그 외 속성**은 \`@\`로 시작: \`@http.status_code:500\`, \`@user.id:1234\`

\`\`\`text
service:checkout status:error                      # 공백 = AND
service:checkout @http.status_code:5*              # 와일드카드: 500~599
@http.status_code:[500 TO 599] -@http.url:*healthz*  # 범위 + 제외(-)
@duration:>2000000000 OR status:error              # 2초 초과 또는 에러
\`\`\`

왼쪽 **Facets** 패널은 클릭으로 조건을 더하는 지름길입니다. 통합 서비스 태깅을 했다면 \`env\`·\`service\`·\`version\` 패싯이 기본입니다.

## 소거 순서: 5분 루틴

1. 시간 범위를 알림 전후 15분으로 좁힙니다.
2. \`service:checkout status:error\` — 에러만 남깁니다.
3. **Group into > Patterns**로 전환합니다. 비슷한 메시지가 묶여 수천 줄이 **5~10개 패턴**이 됩니다. 건수가 튄 패턴이 범인입니다.
4. 그 패턴의 샘플 로그에서 \`version\` 패싯을 봅니다. 새 버전에서만 나오면 배포가 원인입니다.
5. **Saved View**로 저장해 재사용합니다.

## Live Tail: 지금 이 순간

Log Explorer 상단 시간 범위 드롭다운에서 **Live Tail**을 고르면 인덱스 여부와 상관없이 **인제스트되는 모든 로그**가 실시간으로 흐릅니다. 수집을 방금 켰을 때나 배포 직후 확인용입니다. 양이 많으면 자동 샘플링되니 조건으로 좁혀 보세요.

**여기서 막힌다면**

- \`@http.status_code:500\`이 안 잡히면 로그 하나를 열어 실제 속성 경로를 확인하세요.
- Live Tail엔 있는데 Explorer에 없다면 Exclusion Filter나 Daily Quota로 인덱스되지 않은 것입니다.

> 💡 **핵심**: service·status로 거르고 → Patterns로 묶고 → version으로 가릅니다. 이 세 단계가 새벽 2시의 5분입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "Log Explorer — 소거법으로 좁히기",
            lines: [
              { text: "Past 15 Minutes  ·  env:prod", tone: "dim" },
              { text: "service:checkout", tone: "cmd" },
              { text: "48,213 logs", tone: "out" },
              { text: "service:checkout status:error", tone: "cmd" },
              { text: "1,904 logs", tone: "out" },
              { text: "# Group into > Patterns", tone: "comment" },
              { text: "1,612  connection refused to redis://cache:6379 ...", tone: "err" },
              { text: "  241  payment provider timeout after * ms", tone: "out" },
              { text: "   51  invalid coupon code *", tone: "dim" },
              { text: "# 패턴 클릭 → version 패싯: 1.4.2 에서만 발생", tone: "comment" },
              { text: "원인 확정: 1.4.2 배포 후 cache 연결 실패 → 롤백", tone: "ok" },
            ],
            caption: "48,213줄이 세 번의 소거로 한 문장이 됩니다 — 패턴 뷰가 가장 큰 도약입니다.",
          },
        },
      ],
    },
    {
      slug: "dashboards-and-alerts",
      title: "대시보드와 알림",
      description: "메트릭 타입, 대시보드 만들기, Datadog 모니터와 알림 채널, 비용 관리",
      lessons: [
        {
          slug: "metrics-and-dashboards",
          title: "메트릭 종류와 대시보드 만들기",
          minutes: 7,
          content: `팀원끼리 같은 "요청 수"를 다른 숫자로 말한다면 메트릭 **타입**을 모르는 것입니다. 대시보드보다 이것부터 잡습니다.

## 메트릭 5가지 타입

지하철역으로 비유합니다.

- **COUNT** — 구간 내 횟수. "10초 동안 개찰구 통과 120명."
- **RATE** — 초당 횟수. "초당 12명." DogStatsD의 COUNT는 화면에서 RATE로 표시됩니다(Agent 체크·API는 그대로).
- **GAUGE** — 순간 값. "지금 승강장의 340명." CPU 사용률·메모리·큐 길이.
- **HISTOGRAM** — Datadog Agent가 분포를 계산해 **avg·count·median·95percentile·max** 5개로 보냅니다.
- **DISTRIBUTION** — Datadog 서버가 전 호스트를 합쳐 계산. 여러 호스트의 **정확한 퍼센타일**용.

## 대시보드 만들기

1. **Dashboards > New Dashboard**, 이름을 정합니다.
2. **Add Widgets**에서 고릅니다.
   - **Timeseries** — 시간 변화. 선(line)·면(area)·막대(bars).
   - **Query Value** — 현재 값 하나를 큰 숫자로.
   - **Top List** — 태그별 순위. "CPU 상위 10개 호스트".
3. 메트릭(예: \`system.cpu.user\`)을 고르고 **from**에 \`env:prod\`, **avg by**에 \`host\`처럼 나눌 태그를 넣습니다.
4. 오른쪽 위 **Save**.

**Template Variables**로 \`$env\`를 만들고 쿼리에 \`$env\`라고 쓰면, 드롭다운으로 prod↔staging을 한 번에 바꿉니다.

**여기서 막힌다면**

- \`system.cpu.user\`가 없으면 Datadog Agent가 아직 보고 전입니다. \`datadog-agent status\`와 시간 범위(Past 15 Minutes 이상)를 확인하세요.
- 그래프가 한 줄만 나오면 **avg by**에 \`host\`를 넣지 않은 것입니다.

> 💡 **핵심**: 타입을 알면 그래프를 믿을 수 있습니다. Timeseries·Query Value·Top List 세 위젯과 템플릿 변수만으로 팀의 첫 현황판이 완성됩니다.`,
          illustration: {
            type: "grid",
            title: "메트릭 타입 지도",
            items: [
              { label: "COUNT", sublabel: "구간 내 횟수 · 개찰구 통과 120명", icon: "users", tone: "primary" },
              { label: "RATE", sublabel: "초당 횟수 · 초당 12명", icon: "timer", tone: "primary" },
              { label: "GAUGE", sublabel: "순간 값 · 지금 승강장 340명", icon: "gauge", tone: "accent" },
              { label: "HISTOGRAM", sublabel: "Datadog Agent 계산 · 1개 → 5개 메트릭", icon: "chart", tone: "warning" },
              { label: "DISTRIBUTION", sublabel: "서버 계산 · 전 호스트 정확한 p99", icon: "trending-up", tone: "warning" },
              { label: "위젯 3종", sublabel: "Timeseries · Query Value · Top List", icon: "monitor", tone: "success" },
            ],
            caption: "HISTOGRAM과 DISTRIBUTION은 편리한 만큼 메트릭 개수를 5배로 늘립니다 — 마지막 레슨의 비용과 연결됩니다.",
          },
          demo: {
            title: "첫 대시보드에 Timeseries 위젯 추가하기",
            app: {
              kind: "browser",
              url: "app.datadoghq.com/dashboard/lists",
              blocks: [
                { id: "b-h1", type: "heading", label: "Dashboards" },
                { id: "b-new", type: "button", label: "+ New Dashboard" },
                { id: "b-name", type: "input", label: "Dashboard Name", hidden: true },
                { id: "b-create", type: "button", label: "New Dashboard", hidden: true },
                { id: "b-h2", type: "heading", label: "Web 서비스 현황", hidden: true },
                { id: "b-add", type: "button", label: "+ Add Widgets", hidden: true },
                { id: "b-ts", type: "card", label: "📈 Timeseries  ·  🔢 Query Value  ·  📊 Top List", hidden: true },
                { id: "b-metric", type: "input", label: "Select a metric…", hidden: true },
                { id: "b-from", type: "input", label: "from (everywhere)", hidden: true },
                { id: "b-by", type: "badge", label: "avg by host", hidden: true },
                { id: "b-title", type: "input", label: "Widget title", hidden: true },
                { id: "b-save", type: "button", label: "Save", hidden: true },
                { id: "b-widget", type: "card", label: "📈 CPU (prod) — avg by host · 3 lines  ✓ Saved", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① Dashboards 메뉴에서 새 대시보드를 만듭니다" },
              { t: "move", target: "b-new" },
              { t: "click" },
              { t: "type", target: "b-name", text: "Web 서비스 현황" },
              { t: "reveal", target: "b-create" },
              { t: "click", target: "b-create" },
              { t: "hide", target: "b-name" },
              { t: "hide", target: "b-create" },
              { t: "reveal", target: "b-h2" },
              { t: "caption", text: "② Add Widgets에서 Timeseries를 고릅니다" },
              { t: "reveal", target: "b-add" },
              { t: "click", target: "b-add" },
              { t: "reveal", target: "b-ts" },
              { t: "click", target: "b-ts" },
              { t: "caption", text: "③ 메트릭과 범위(from), 나눌 태그(avg by)를 넣습니다" },
              { t: "type", target: "b-metric", text: "system.cpu.user" },
              { t: "type", target: "b-from", text: "env:prod" },
              { t: "reveal", target: "b-by" },
              { t: "type", target: "b-title", text: "CPU (prod)" },
              { t: "caption", text: "④ Save를 누르면 위젯이 대시보드에 놓입니다" },
              { t: "reveal", target: "b-save" },
              { t: "click", target: "b-save" },
              { t: "reveal", target: "b-widget" },
              { t: "caption", text: "✅ 같은 방법으로 Query Value·Top List를 더하면 첫 현황판 완성" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "monitors",
          title: "Datadog 모니터 만들기: 임계값·이상 탐지·복구 조건·노이즈 줄이기",
          minutes: 6,
          content: `대시보드는 **보고 있을 때만** 쓸모가 있습니다. 새벽에 나 대신 지켜보다 깨워 줄 것, 그것이 **Datadog 모니터**입니다.

## 모니터 종류: 무엇을 감시할까

**Monitors > New Monitor**에서 종류를 고릅니다. 입문용 여섯 가지입니다.

- **Metric** — 메트릭이 임계값을 넘으면. 가장 기본.
- **Logs** — 조건에 맞는 로그가 N분에 N건 넘으면.
- **Host** — 호스트가 보고를 멈추면.
- **Anomaly(이상 탐지)** — 과거 패턴에서 벗어나면. 알고리즘 basic·agile·robust, 계절성(시간·일·주)의 **3배 이상 과거 데이터** 필요.
- **Outlier** — 같은 그룹 중 하나만 다르게 굴면.
- **Composite** — 여러 모니터를 AND/OR로 묶어 오탐 감소. "에러율 높음 **AND** 트래픽 있음".

## 임계값과 복구 임계값

보일러는 18도에 켜지고 20도에 꺼집니다. 한 값으로 켜고 끄면 경계에서 계속 딸깍거리기 때문입니다. 모니터도 같습니다.

- **Alert threshold** — 울리는 값. 예: 에러율 5%
- **Warning threshold** — 그 전 주의 값. 예: 3%
- **Alert recovery threshold** — **해제**되는 값. 예: 2%. 없으면 5% 근처에서 알림·복구가 반복(플래핑)됩니다.
- **평가 윈도우** — "최근 5분 평균"처럼 볼 기간.

## 노이즈 줄이는 세 설정

- **No Data** — 데이터가 끊겼을 때의 처리. \`Show NO DATA and notify\`면 "조용한 것"도 알림. 원래 끊기는 배치 지표는 \`Show OK\`나 \`Evaluate as zero\`.
- **Renotify** — 미해결이면 N분마다 재알림. **N회 후 중단**을 함께 켭니다.
- **Evaluation delay** — 늦게 도착하는 클라우드 메트릭은 평가를 늦춰 가짜 No Data를 막습니다.

우선순위 **P1~P5**도 붙여 둡니다.

> 💡 **핵심**: 좋은 모니터는 "울리는 값"과 "꺼지는 값"이 다르고, No Data 처리를 정했고, 재알림에 상한이 있습니다. 이 셋이 없으면 알림은 소음이 됩니다.`,
          illustration: {
            type: "cycle",
            title: "모니터 상태의 순환과 임계값",
            center: "평가 윈도우마다 반복",
            nodes: [
              { label: "OK", sublabel: "에러율 < 2%", icon: "check" },
              { label: "WARN", sublabel: "3% 초과 · 주의 알림", icon: "alert" },
              { label: "ALERT", sublabel: "5% 초과 · @slack·@pagerduty", icon: "siren" },
              { label: "RECOVERED", sublabel: "복구 임계값 2% 미만으로 하락", icon: "refresh" },
              { label: "NO DATA", sublabel: "N분간 데이터 없음 · 알림 여부 선택", icon: "eye" },
            ],
            caption: "울리는 값(5%)과 꺼지는 값(2%) 사이의 간격이 플래핑을 막는 완충지대입니다.",
          },
        },
        {
          slug: "notifications-and-oncall",
          title: "알림 채널: Slack·PagerDuty·Datadog On-Call과 @-멘션 문법",
          minutes: 5,
          content: `모니터가 울려도 **아무도 보지 않는 곳**에 울리면 없는 것과 같습니다. 알림이 사람에게 닿는 경로를 설계합니다.

## @-멘션 한 줄로 채널 연결

모니터 편집 화면 아래 **Notify your team** 칸에 \`@\` 핸들을 적으면 그 채널로 갑니다. 먼저 **Integrations**에서 통합을 연결합니다(Slack은 **Configure > Add a workspace**, 채널에 \`/invite @Datadog\`).

- \`@slack-<채널명>\` — Slack. 계정이 여러 개면 \`@slack-<계정>-<채널명>\`
- \`@pagerduty-<서비스명>\` — PagerDuty 인시던트 생성
- \`@oncall-<팀 핸들>\` — Datadog On-Call 팀 호출
- \`@webhook-<이름>\` — 사내 시스템에 HTTP 전송
- \`@이메일주소\` — 이메일

핸들 앞뒤엔 공백이 있어야 인식됩니다.

## 상태별 다른 문장: 조건 템플릿

한 메시지에서 상태별로 내용과 채널을 나눕니다.

\`\`\`text
{{#is_alert}}
🔴 {{service.name}} 에러율 {{value}}% (임계 {{threshold}}%) — 호스트 {{host.name}}
런북: https://wiki.example.com/runbook/checkout
@pagerduty-checkout @slack-incident
{{/is_alert}}
{{#is_warning}}⚠️ 에러율 {{value}}% 상승 중 @slack-checkout-alerts{{/is_warning}}
{{#is_recovery}}✅ 복구됨 @slack-checkout-alerts{{/is_recovery}}
\`\`\`

경고는 Slack만, 알림(alert)은 PagerDuty까지 — **심각도별 채널 분리**가 새벽 호출을 줄이는 첫 방법입니다. \`{{#is_no_data}}\`·\`{{#is_renotify}}\`도 같은 방식입니다.

## 온콜: 누가 받나

병원 당직 호출은 간호사 → 당직 의사 → 과장 순으로 올라갑니다. 이 **일정과 에스컬레이션 정책**을 맡는 도구가 둘입니다.

- **PagerDuty** — 오래된 표준.
- **Datadog On-Call** — Datadog 자체 온콜 제품(2024년 공개). 왼쪽 메뉴 **On-Call**(app.datadoghq.com/on-call)에서 **Teams · Schedules · Escalation Policies**를 만듭니다. 페이지는 **Triggered → Acknowledged → Resolved**를 지나며, 승인이 없으면 다음 사람으로 넘어갑니다. 좌석 단위로 과금됩니다.

> 💡 **핵심**: 심각도별로 채널을 나누고(\`{{#is_alert}}\`엔 페이저, \`{{#is_warning}}\`엔 Slack), 사람에게 닿는 마지막 구간은 온콜 도구의 에스컬레이션에 맡기세요.`,
          illustration: {
            type: "chat",
            title: "#incident 채널에 도착한 알림",
            messages: [
              { role: "system", text: "Datadog 모니터 [checkout 에러율] 상태 변경: WARN → ALERT (P1)" },
              { role: "ai", text: "🔴 checkout 에러율 6.8% (임계 5%) — 호스트 web-03\n런북: wiki.example.com/runbook/checkout\n📟 @pagerduty-checkout 인시던트 #4821 생성됨" },
              { role: "user", text: "확인했습니다. 1.4.2 배포 롤백 진행 중 (Acknowledged)" },
              { role: "ai", text: "✅ [Recovered] checkout 에러율 1.2% — 복구 임계값(2%) 아래로 하락. 인시던트 #4821 자동 해제" },
            ],
            caption: "같은 모니터, 상태마다 다른 문장과 채널 — 조건 템플릿이 알림을 '읽을 수 있는 것'으로 만듭니다.",
          },
        },
        {
          slug: "cost-control-and-next",
          title: "비용 관리: 커스텀 메트릭·카디널리티·로그 인덱스 폭탄 피하기 + 다음 단계",
          minutes: 5,
          content: `**카디널리티**와 **로그 인덱스** — Datadog 청구서 사고의 대부분은 이 두 단어로 설명됩니다.

## 커스텀 메트릭은 '조합'으로 센다

수도 계량기를 방마다 달면 방 수만큼 요금이 나옵니다. Datadog도 **메트릭 이름 + 태그 값 조합 하나**를 커스텀 메트릭 1개로 셉니다.

- \`checkout.latency\`에 \`endpoint\` 5종 × \`status\` 3종 × \`host\` 10대 → **150개**
- HISTOGRAM으로 보내면 조합마다 5개 파생 → **750개**
- 태그에 \`user_id\`를 붙이면 사용자 수만큼 폭발합니다 — 카디널리티 문제입니다.

2026년 9월 기준 Infrastructure Pro는 호스트당 **100개**, Enterprise는 **200개**가 포함되며 조직 전체로 합산됩니다. 과금은 **월 평균(시간별 고유 개수)** 기준, 초과분은 **공식 요금 페이지에서 확인**하세요.

예방 3원칙: ① user_id·request_id·이메일·URL처럼 **무한한 값은 태그로 쓰지 않기**. ② **HISTOGRAM·DISTRIBUTION은 퍼센타일이 정말 필요할 때만**, 평균이면 GAUGE. ③ **Metrics > Summary**에서 카디널리티를 점검하고, 폭발한 메트릭은 **Metrics without Limits**로 인덱스 태그만 남기기.

## 로그 인덱스 폭탄 체크리스트

- 인덱스마다 **Daily Quota**가 있는가?
- \`status:debug\`·헬스체크·로드밸런서 접근 로그에 **Exclusion Filter**가 있는가?
- 보존 기간이 필요 이상 길지 않은가?
- **Plan & Usage**(왼쪽 아래 계정 메뉴)를 주 1회 보는 사람이 있는가?

## 다음 단계

"어디서 시간을 썼나"는 트레이스의 몫입니다. **"Datadog 심화: APM·SLO·인시던트 운영"** 에서 APM·SLO·인시던트 운영을 배웁니다. Kubernetes를 더 깊이 보려면 **"Kubernetes 운영: 프로덕션 클러스터 설계와 관리"** 도 함께 들으세요.

> 💡 **핵심**: 커스텀 메트릭은 태그 조합 수로, 로그는 인덱스 건수로 청구됩니다. 무한한 값은 태그에서 빼고, 인덱스엔 쿼터와 제외 필터를 걸면 청구서는 예측 가능해집니다.`,
          illustration: {
            type: "steps",
            title: "청구서를 예측 가능하게 만드는 4단계",
            steps: [
              { label: "태그 설계 점검", sublabel: "user_id·request_id 같은 무한 값 제거", icon: "filter" },
              { label: "메트릭 타입 다이어트", sublabel: "HISTOGRAM → 필요 없으면 GAUGE", icon: "gauge" },
              { label: "인덱스 관문 잠그기", sublabel: "Daily Quota + Exclusion Filter + 보존 기간", icon: "lock" },
              { label: "주 1회 사용량 확인", sublabel: "Plan & Usage · Metrics Summary", icon: "dollar" },
            ],
            caption: "비용 사고는 '한 번의 실수'가 아니라 '점검 루틴의 부재'에서 옵니다.",
          },
        },
      ],
    },
  ],
};
