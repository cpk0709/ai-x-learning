import type { Course } from "../types";

/**
 * Kubernetes 입문 (인프라 & DevOps 3/6단계) — docker-basics를 마친 학습자를 위한 첫 오케스트레이션 강의.
 *
 * 사실 검증 메모 (2026-09 기준 웹 검색):
 * - Kubernetes 최신 1.37 (2026-08-26), 지원 정책 N-2 — 공통 지침 검증값 (kubernetes.io)
 * - kind: `brew install kind`, `kind create cluster [--name] [--config]`, 컨텍스트 이름 `kind-<이름>`,
 *   `kind get clusters` / `kind delete cluster`, 노드 설정 apiVersion kind.x-k8s.io/v1alpha4,
 *   최신 릴리스의 기본 노드 이미지는 Kubernetes 1.37 (kind.sigs.k8s.io, github.com/kubernetes-sigs/kind)
 * - kind에서 LoadBalancer는 별도 도구(cloud-provider-kind) 없이는 EXTERNAL-IP가 pending (kind.sigs.k8s.io)
 * - Docker Desktop: 4.51+는 대시보드 Kubernetes 뷰 > Create cluster(프로비저닝 Kubeadm/kind 선택 > Create),
 *   그 이전은 Settings > Kubernetes > Enable Kubernetes > Apply. 컨텍스트 `docker-desktop` (docs.docker.com desktop/features/kubernetes, settings)
 * - Gateway API 현재 릴리스 v1.6.1, 설치 `kubectl apply --server-side -f .../standard-install.yaml` (gateway-api.sigs.k8s.io getting-started)
 * - kubectl 설치 macOS `brew install kubectl` (kubernetes-cli), 확인 `kubectl version --client` (kubernetes.io)
 * - kubectl 문법: get/describe/logs(-f, --previous, -c)/exec -it <pod> -- sh/apply -f/delete -f/port-forward/
 *   -n, -A(--all-namespaces), create configmap --from-literal, create secret generic --from-literal,
 *   config set-context --current --namespace, get pods -l, scale, rollout status/history/undo, set image (kubernetes.io 퀵 레퍼런스)
 * - Deployment: apiVersion apps/v1, selector.matchLabels와 template.metadata.labels 일치 필수,
 *   롤링 업데이트 기본 maxSurge/maxUnavailable 25%, revisionHistoryLimit 기본 10, --record 폐기 → kubernetes.io/change-cause 어노테이션 (kubernetes.io)
 * - Service 타입 ClusterIP(기본)/NodePort(30000-32767)/LoadBalancer/ExternalName, targetPort 생략 시 port와 동일 (kubernetes.io)
 * - Secret: 기본은 base64 인코딩일 뿐 암호화 아님, etcd에 평문 저장 → 저장 시 암호화·RBAC 권고, 기본 타입 Opaque, stringData 필드 (kubernetes.io)
 * - ConfigMap 주입: env valueFrom.configMapKeyRef / envFrom.configMapRef / volumes.configMap — 볼륨 마운트는 자동 갱신, 환경변수는 재시작 필요 (kubernetes.io)
 * - 초기 네임스페이스 default/kube-system/kube-public/kube-node-lease, 노드·PV·네임스페이스는 비네임스페이스 리소스,
 *   DNS <service>.<namespace>.svc.cluster.local (kubernetes.io)
 * - Gateway API: 애드온(CRD 설치 + 구현체 컨트롤러 필요), GatewayClass/Gateway/HTTPRoute 역할 분리, apiVersion gateway.networking.k8s.io/v1,
 *   standard 채널 설치는 releases의 standard-install.yaml을 `kubectl apply --server-side -f` (kubernetes.io, gateway-api.sigs.k8s.io)
 * - ingress-nginx 2026-03 은퇴(패치·CVE 대응 없음), Ingress API 자체는 유지(기능 동결), ingress2gateway 도구 (kubernetes.io/blog 2025-11-11, 2026-01-29)
 * - Helm 4 (2025-11-12): 신규 설치는 server-side apply 기본, --force→--force-replace, --atomic→--rollback-on-failure(구 플래그는 경고 후 동작),
 *   WASM 플러그인, kstatus 기반 --wait. repo add/update/search/install/upgrade/uninstall/--set/-f/-n/--create-namespace 문법은 동일 (helm.sh)
 * - 예시 Helm 차트 podinfo: `helm repo add podinfo https://stefanprodan.github.io/podinfo`, 값 replicaCount, 컨테이너 포트 9898 (github.com/stefanprodan/podinfo)
 * - 파드 진단: Pending(자원 부족 "Insufficient cpu/memory", PVC 미바인딩), ImagePullBackOff/ErrImagePull, CrashLoopBackOff → `logs --previous`,
 *   OOMKilled는 describe의 Last State Reason·Exit Code 137, `kubectl events`, `kubectl debug` 임시 컨테이너 (kubernetes.io)
 * - 컨트롤 플레인 구성: kube-apiserver, etcd, kube-scheduler, kube-controller-manager(+cloud-controller-manager); 노드: kubelet, kube-proxy(선택), 컨테이너 런타임 (kubernetes.io)
 */
export const kubernetesBasics: Course = {
  slug: "kubernetes-basics",
  title: "Kubernetes 입문: 컨테이너 오케스트레이션 첫걸음",
  subtitle: "컨테이너 100개를 사람 대신 관리하는 시스템, 내 노트북에서 직접 띄우고 배포까지",
  description:
    "Docker로 컨테이너 하나를 띄울 줄 알게 됐다면, 다음 질문은 '그게 100개가 되면?'입니다. 이 강의는 쿠버네티스(Kubernetes)가 그 질문에 어떻게 답하는지를 내 노트북 위의 로컬 클러스터에서 직접 확인합니다. 클러스터 구조와 선언형 모델을 이해한 뒤, 파드·디플로이먼트·Service·ConfigMap 같은 핵심 오브젝트를 YAML로 만들고, 롤링 업데이트와 롤백, Gateway API로 외부 노출, Helm 차트 설치까지 실습합니다. 마지막에는 파드가 안 뜰 때 원인을 찾는 진단 순서를 손에 익혀, 운영 강의로 넘어갈 준비를 마칩니다.",
  category: "devops",
  level: "intermediate",
  tags: ["Kubernetes", "K8s", "kubectl", "컨테이너 오케스트레이션", "Helm", "Gateway API"],
  gradient: ["#3b82f6", "#1d4ed8"],
  icon: "ship",
  outcomes: [
    "kind 또는 Docker Desktop으로 로컬 클러스터를 만들고 kubectl로 상태를 확인할 수 있다",
    "파드·디플로이먼트·Service·ConfigMap·Secret을 YAML 매니페스트로 작성하고 apply할 수 있다",
    "롤링 업데이트를 수행하고 문제가 생기면 한 줄로 롤백할 수 있다",
    "Gateway API로 외부 트래픽을 받고, Helm 차트로 남이 만든 앱을 설치할 수 있다",
    "Pending·CrashLoopBackOff·ImagePullBackOff 상태의 원인을 describe와 logs로 찾을 수 있다",
  ],
  modules: [
    {
      slug: "why-kubernetes",
      title: "왜 Kubernetes인가",
      description: "컨테이너가 많아지면 생기는 문제, 클러스터의 구조, 선언형 모델, 그리고 첫 로컬 클러스터",
      lessons: [
        {
          slug: "containers-at-scale",
          title: "컨테이너가 100개가 되면 생기는 일",
          minutes: 5,
          content: `\`docker run\` 한 줄로 컨테이너를 띄우는 건 이제 익숙하죠. 그런데 서비스가 커져서 컨테이너가 100개, 서버가 10대가 되면 그 한 줄이 갑자기 100줄, 1,000줄이 됩니다. 쿠버네티스는 바로 이 지점에서 등장합니다.

## 서버 여러 대에 컨테이너를 흩어 놓으면

- **어느 서버에 띄울까?** 메모리가 남는 서버를 사람이 매번 골라야 합니다.
- **죽으면 누가 다시 띄우나?** 새벽 3시에 누군가 SSH로 들어가야 합니다.
- **새 버전은 어떻게 바꾸나?** 한 번에 내리면 서비스가 멈추고, 하나씩 바꾸면 반나절이 걸립니다.
- **주소는 어떻게 찾나?** 컨테이너가 다시 뜨면 IP가 바뀝니다.

Docker 하나로는 답이 없습니다. 결국 스크립트를 짜게 되고, 그 스크립트가 곧 '내가 만든 조악한 오케스트레이터'가 됩니다.

## 물류센터의 관제 시스템

택배 상자(컨테이너) 몇 개는 사람이 직접 옮기면 됩니다. 하지만 하루 10만 개가 되면 **어느 벨트로 보낼지, 고장 난 벨트는 어떻게 우회할지**를 관제 시스템이 결정합니다. Kubernetes는 컨테이너의 관제 시스템입니다. 여러 노드 위에 컨테이너를 배치하고, 죽으면 되살리고, 새 버전으로 순차 교체하고, 바뀌지 않는 주소를 붙여 줍니다.

## 이 강의의 로드맵

1. **왜·구조·선언형** — Kubernetes가 일하는 방식을 이해하고 내 노트북에 클러스터를 만듭니다 (모듈 1)
2. **핵심 오브젝트** — 파드, 디플로이먼트, Service, ConfigMap, 네임스페이스를 YAML로 다룹니다 (모듈 2)
3. **노출과 패키징** — 외부 접속, 무중단 배포와 롤백, Helm, 파드가 안 뜰 때의 진단법 (모듈 3)

선수 지식은 "Docker 입문" 수준(이미지·컨테이너·포트 매핑·환경변수)이면 충분합니다.

> 💡 **핵심**: Kubernetes는 "컨테이너를 띄우는 도구"가 아니라 **"컨테이너 수백 개의 배치·복구·교체를 대신 결정하는 시스템"**입니다.`,
          illustration: {
            type: "compare",
            title: "Docker 단독 vs Kubernetes",
            columns: [
              {
                title: "Docker 단독 (서버 1대)",
                icon: "container",
                tone: "muted",
                items: [
                  "docker run으로 직접 실행",
                  "죽으면 사람이 다시 띄움",
                  "새 버전은 내리고 다시 올림",
                  "IP가 바뀌면 설정도 수정",
                ],
              },
              {
                title: "Kubernetes (서버 N대)",
                icon: "ship",
                tone: "primary",
                items: [
                  "어느 노드에 둘지 자동 배치",
                  "죽으면 자동 재생성",
                  "순차 교체(롤링 업데이트)",
                  "고정 주소(Service)로 연결",
                ],
              },
            ],
            caption: "오른쪽 열의 네 가지가 이 강의에서 손으로 확인할 것들입니다.",
          },
        },
        {
          slug: "cluster-architecture",
          title: "클러스터 구조: 컨트롤 플레인과 노드",
          minutes: 6,
          content: `Kubernetes를 처음 보면 부품 이름이 너무 많아 겁부터 납니다. 하지만 큰 그림은 단순합니다. **결정하는 쪽**과 **일하는 쪽**, 두 부류만 구분하면 됩니다.

## 컨트롤 플레인: 결정하는 쪽

회사로 비유하면 본사입니다. 본사에는 부서가 넷 있습니다.

- **kube-apiserver** — 접수 창구. kubectl이든 다른 컴포넌트든 **모든 요청은 여기로만** 들어옵니다.
- **etcd** — 장부. 클러스터의 모든 상태를 기록하는 키-값 저장소입니다. 이 장부를 잃으면 클러스터를 잃습니다.
- **kube-scheduler** — 배치 담당. 자리를 못 잡은 파드에 "이 노드로 가라"고 정해 줍니다. 남은 CPU·메모리, 배치 제약을 따집니다.
- **kube-controller-manager** — 관리자들의 묶음. "3개여야 하는데 2개뿐이네" 같은 차이를 발견하고 메우는 컨트롤러들이 돕니다.

## 노드: 일하는 쪽

노드는 컨테이너가 실제로 실행되는 서버(물리 서버든 가상머신이든)입니다. 노드마다 두세 가지 프로그램이 상주합니다.

- **kubelet** — 현장 반장. API 서버가 "이 파드를 실행하라"고 하면 컨테이너 런타임에 지시하고, 상태를 계속 보고합니다.
- **컨테이너 런타임** — 컨테이너를 실제로 띄우는 소프트웨어. containerd, CRI-O 등.
- **kube-proxy** — 노드의 네트워크 규칙을 관리해 Service 트래픽이 파드에 도달하게 합니다. 일부 네트워크 플러그인이 이 역할을 대신하므로 선택 사항입니다.

## 왜 이 구조가 중요한가

kubectl로 무언가를 만들면 여러분은 **API 서버에 "이렇게 되어야 해"를 적어 넣는 것**뿐입니다. 스케줄러가 자리를 정하고, kubelet이 실행하고, 컨트롤러가 개수를 맞춥니다. 이 분업을 알면 다음 레슨의 선언형 모델이 자연스럽게 읽힙니다.

> 💡 **핵심**: 컨트롤 플레인은 **결정**하고 노드는 **실행**합니다. 모든 결정은 API 서버를 거쳐 etcd에 기록됩니다.`,
          illustration: {
            type: "stack",
            title: "클러스터의 층 구조",
            layers: [
              {
                label: "kubectl · CI/CD · 대시보드",
                sublabel: "사용자와 도구 — API 서버에 요청을 보냄",
                icon: "terminal",
                tone: "muted",
              },
              {
                label: "컨트롤 플레인",
                sublabel: "kube-apiserver · etcd · kube-scheduler · kube-controller-manager",
                icon: "cpu",
                tone: "primary",
              },
              {
                label: "노드 (여러 대)",
                sublabel: "kubelet · kube-proxy · 컨테이너 런타임",
                icon: "server",
                tone: "accent",
              },
              {
                label: "파드 안의 컨테이너",
                sublabel: "여러분의 앱이 실제로 실행되는 곳",
                icon: "boxes",
                tone: "success",
              },
            ],
            caption: "위에서 내린 결정이 아래로 흐르고, 아래의 상태 보고가 다시 위로 올라갑니다.",
          },
        },
        {
          slug: "declarative-model",
          title: "선언형 모델: \"이렇게 되어 있어야 해\"라고 말하기",
          minutes: 5,
          content: `Docker를 쓸 때 우리는 "컨테이너를 실행해"라고 **명령**했습니다. Kubernetes에게는 "컨테이너 3개가 떠 있어야 해"라고 **선언**합니다. 이 차이가 Kubernetes의 거의 모든 동작을 설명합니다.

## 명령형 vs 선언형

- **명령형**: "A를 실행하고, 그다음 B를 실행하고, 죽으면 C를 실행해." 순서와 예외 처리를 전부 내가 책임집니다.
- **선언형**: "최종 상태는 이것이다." 어떻게 도달할지, 중간에 무엇이 깨졌는지는 시스템이 알아서 처리합니다.

자동 온도조절기가 좋은 비유입니다. 여러분은 "24도"라고 설정만 합니다. 창문이 열려 실내 온도가 떨어지면 온도조절기가 알아서 난방을 켭니다. 여러분이 매번 "지금 22도니까 난방 켜"라고 명령하지 않아도 됩니다.

## 조정 루프(Reconciliation Loop)

Kubernetes 안의 컨트롤러들은 아주 단순한 반복을 멈추지 않고 돕니다.

1. **원하는 상태**를 읽습니다 — 매니페스트에 적힌 \`spec\` (예: 레플리카 3)
2. **현재 상태**를 관찰합니다 — 실제로 떠 있는 파드 2개
3. **차이를 메웁니다** — 파드 1개를 새로 만듭니다
4. 다시 1번으로

파드가 죽어도 사람이 개입하지 않는 이유가 바로 이것입니다. 죽은 순간 "원하는 3 ≠ 현재 2"라는 차이가 생기고, 컨트롤러가 그 차이를 메웁니다.

## 실무에서 이것이 의미하는 것

- 매니페스트(YAML)는 **원하는 상태를 적은 문서**입니다. 그래서 Git에 넣고 리뷰할 수 있습니다.
- 같은 파일을 \`kubectl apply\`로 몇 번 적용해도 결과는 같습니다. 이미 그 상태면 아무 일도 하지 않습니다.
- 클러스터를 고치고 싶으면 서버에 들어가 손대는 대신 **문서를 고치고 다시 apply**합니다.

> 💡 **핵심**: Kubernetes에게는 "하라"가 아니라 **"이래야 한다"**를 말합니다. 그 상태를 지키는 일은 조정 루프가 24시간 맡습니다.`,
          illustration: {
            type: "chat",
            title: "선언과 조정 — 컨트롤러와의 대화",
            messages: [
              { role: "user", text: "web 파드가 항상 3개 떠 있어야 해. (replicas: 3)" },
              { role: "ai", text: "현재 0개 → 3개 생성했습니다." },
              { role: "system", text: "[새벽 3시] 노드 장애로 web 파드 1개 종료" },
              { role: "ai", text: "원하는 3 ≠ 현재 2. 파드 1개를 다른 노드에 새로 만들었습니다." },
              { role: "user", text: "(같은 파일을 다시 apply)" },
              { role: "ai", text: "이미 원하는 상태입니다. 변경 없음." },
            ],
            caption: "사람은 원하는 상태를 한 번 말하고, 컨트롤러가 차이를 계속 메웁니다.",
          },
        },
        {
          slug: "local-cluster-setup",
          title: "로컬 클러스터 만들기: kind·Docker Desktop·minikube",
          minutes: 7,
          content: `클라우드 계정도, 서버도 필요 없습니다. Docker가 돌아가는 노트북이면 5분 안에 Kubernetes 클러스터가 생깁니다. 이 강의의 모든 실습은 이 위에서 합니다.

## 세 가지 선택지

- **kind** — Docker 컨테이너를 노드로 삼습니다. 가볍고 빠르며 다중 노드 연습도 됩니다. **이 강의의 기본 경로**.
- **Docker Desktop 내장 Kubernetes** — 4.51 이상은 대시보드 왼쪽 **Kubernetes** 메뉴 > **Create cluster**에서 프로비저닝 방식(Kubeadm 또는 kind)을 고르고 **Create**. 그 이전 버전은 **Settings > Kubernetes**에서 **Enable Kubernetes**를 켜고 **Apply**. 컨텍스트 이름은 \`docker-desktop\`.
- **minikube** — 대시보드와 애드온이 풍부한 공식 학습 도구. \`minikube start\` 한 줄이면 됩니다.

## kind로 따라 하기 (macOS 기준)

\`\`\`bash
brew install kind kubectl        # Windows/Linux는 공식 문서의 설치법 참고
kind create cluster --name learn # 노드 이미지 내려받기 포함 1~2분
kubectl get nodes                # STATUS가 Ready면 성공
kubectl cluster-info --context kind-learn
\`\`\`

kind는 클러스터를 만들면서 kubectl 컨텍스트를 \`kind-learn\`으로 자동 전환합니다. 다중 노드를 연습하려면 아래 설정 파일을 \`--config\`로 넘깁니다.

\`\`\`yaml
# kind-config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
\`\`\`

다 쓴 클러스터는 \`kind delete cluster --name learn\`으로 지웁니다. 다시 만드는 데 1~2분이면 됩니다.

## 여기서 막힌다면

- \`Cannot connect to the Docker daemon\` — Docker Desktop이 꺼져 있습니다. 먼저 실행하세요.
- \`kubectl get nodes\`가 다른 클러스터를 가리킴 — \`kubectl config get-contexts\`로 확인하고 \`kubectl config use-context kind-learn\`으로 바꿉니다.
- 노드가 오래 \`NotReady\` — Docker Desktop 메모리 부족일 수 있습니다. Settings > Resources에서 4GB 이상으로 올려 보세요.

> 💡 **핵심**: 로컬 클러스터는 **부숴도 되는 연습장**입니다. 망가지면 지우고 다시 만드세요 — 그 편이 고치는 것보다 빠릅니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "zsh — kind create cluster",
            lines: [
              { text: "kind create cluster --name learn", tone: "cmd" },
              { text: 'Creating cluster "learn" ...', tone: "out" },
              { text: " ✓ Ensuring node image (kindest/node:v1.37.0) 🖼", tone: "ok" },
              { text: " ✓ Preparing nodes 📦", tone: "ok" },
              { text: " ✓ Writing configuration 📜", tone: "ok" },
              { text: " ✓ Starting control-plane 🕹️", tone: "ok" },
              { text: " ✓ Installing CNI 🔌", tone: "ok" },
              { text: " ✓ Installing StorageClass 💾", tone: "ok" },
              { text: 'Set kubectl context to "kind-learn"', tone: "dim" },
              { text: "kubectl get nodes", tone: "cmd" },
              { text: "NAME                  STATUS   ROLES           AGE   VERSION", tone: "dim" },
              { text: "learn-control-plane   Ready    control-plane   45s   v1.37.0", tone: "out" },
            ],
            caption: "노드 하나가 Ready — 컨트롤 플레인과 노드가 한 컨테이너에 들어 있는 최소 클러스터입니다.",
          },
          demo: {
            title: "kind로 2노드 클러스터 만들고 확인하기",
            app: {
              kind: "code-editor",
              windowTitle: "kind-config.yaml — 로컬 클러스터",
              files: [
                { id: "f-kind", name: "kind-config.yaml", active: true },
                { id: "f-readme", name: "README.md" },
              ],
              code: [
                { id: "c1", text: "kind: Cluster" },
                { id: "c2", text: "apiVersion: kind.x-k8s.io/v1alpha4" },
                { id: "c3", text: "nodes:" },
                { id: "c4", text: "- role: control-plane", indent: 1 },
                { id: "c5", text: "- role: worker", indent: 1, tone: "add", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "kind create cluster --name learn \\", tone: "cmd", hidden: true },
                { id: "t1b", text: "  --config kind-config.yaml", tone: "cmd", hidden: true },
                { id: "t2", text: 'Creating cluster "learn" ...', tone: "out", hidden: true },
                { id: "t3", text: " ✓ Ensuring node image (kindest/node:v1.37.0) 🖼", tone: "ok", hidden: true },
                { id: "t4", text: " ✓ Preparing nodes 📦 📦", tone: "ok", hidden: true },
                { id: "t5", text: " ✓ Starting control-plane 🕹️", tone: "ok", hidden: true },
                { id: "t6", text: " ✓ Joining worker nodes 🚜", tone: "ok", hidden: true },
                { id: "t7", text: 'Set kubectl context to "kind-learn"', tone: "out", hidden: true },
                { id: "t8", text: "kubectl get nodes", tone: "cmd", hidden: true },
                { id: "t9", text: "NAME                  STATUS   ROLES           AGE   VERSION", tone: "out", hidden: true },
                { id: "t10", text: "learn-control-plane   Ready    control-plane   60s   v1.37.0", tone: "ok", hidden: true },
                { id: "t11", text: "learn-worker          Ready    <none>          40s   v1.37.0", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 설정 파일에 워커 노드 하나를 추가합니다" },
              { t: "move", target: "c4" },
              { t: "click" },
              { t: "type", target: "c5", text: "- role: worker" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 설정 파일을 넘겨 클러스터를 만듭니다" },
              { t: "type", target: "t1", text: "kind create cluster --name learn \\" },
              { t: "type", target: "t1b", text: "  --config kind-config.yaml" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "reveal", target: "t6" },
              { t: "caption", text: "③ kubectl 컨텍스트가 kind-learn으로 자동 전환됩니다" },
              { t: "reveal", target: "t7" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 노드 목록으로 클러스터가 살아 있는지 확인합니다" },
              { t: "type", target: "t8", text: "kubectl get nodes" },
              { t: "reveal", target: "t9" },
              { t: "reveal", target: "t10" },
              { t: "reveal", target: "t11" },
              { t: "move", target: "t11" },
              { t: "caption", text: "✅ 컨트롤 플레인 1 + 워커 1, 두 노드가 Ready입니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "core-objects",
      title: "핵심 오브젝트",
      description: "파드, kubectl, 디플로이먼트, Service, ConfigMap·Secret, 네임스페이스와 레이블",
      lessons: [
        {
          slug: "pods",
          title: "파드: 가장 작은 배포 단위",
          minutes: 5,
          content: `Docker에서는 컨테이너가 최소 단위였습니다. Kubernetes는 컨테이너를 직접 다루지 않고, 컨테이너를 감싼 **파드**를 최소 단위로 씁니다. 왜 한 겹을 더 씌웠을까요?

## 파드 = 컨테이너를 담는 도시락 통

도시락 통은 보통 한 칸이지만 필요하면 여러 칸을 둡니다. 파드도 같습니다.

- 대부분의 파드는 **컨테이너 1개**를 담습니다.
- 꼭 함께 움직여야 하는 컨테이너(앱 + 로그 수집기)는 한 파드에 담습니다.
- 한 파드의 컨테이너들은 **같은 IP·네트워크**를 공유해 \`localhost\`로 통신하고 볼륨도 함께 씁니다.
- 파드는 **통째로** 한 노드에 배치되고, 통째로 죽고, 통째로 다시 만들어집니다.

그리고 파드는 소모품입니다. 죽으면 **같은 파드가 살아나는 게 아니라 새 파드가 만들어지고**, IP도 바뀝니다. 실무에서는 디플로이먼트(다음다음 레슨)로 만듭니다. 단독 파드는 구조를 익히는 연습입니다.

## 최소 매니페스트

매니페스트는 네 부분으로 시작합니다: 어떤 API 버전(\`apiVersion\`)의 어떤 종류(\`kind\`)를, 어떤 이름(\`metadata\`)으로, 어떤 내용(\`spec\`)으로.

\`\`\`yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
  labels:
    app: hello
spec:
  containers:
    - name: web
      image: nginx:1.27
      ports:
        - containerPort: 80
\`\`\`

\`kubectl apply -f pod.yaml\`로 만들고 \`kubectl get pods\`로 확인합니다. STATUS가 \`ContainerCreating\` → \`Running\`이면 성공. 삭제는 \`kubectl delete -f pod.yaml\`.

## 여기서 막힌다면

- \`error: error parsing pod.yaml\` 또는 \`mapping values are not allowed\` — YAML 들여쓰기가 어긋났습니다. 탭 대신 공백 2칸인지 확인하세요.
- STATUS가 \`ImagePullBackOff\` — 이미지 이름이나 이미지 태그 오타입니다. \`kubectl describe pod hello\`의 Events 맨 아래 줄에 이유가 나옵니다.

> 💡 **핵심**: 파드는 Kubernetes가 배치하고 죽이고 되살리는 **최소 단위이자 소모품**입니다. IP를 믿지 마세요 — 그래서 Service가 필요합니다.`,
          illustration: {
            type: "grid",
            title: "파드의 네 가지 성질",
            items: [
              { label: "컨테이너 1개 이상", sublabel: "보통은 1개, 꼭 붙어야 하면 여러 개", icon: "container", tone: "primary" },
              { label: "IP·네트워크 공유", sublabel: "파드 안에서는 localhost로 통신", icon: "network", tone: "accent" },
              { label: "볼륨 공유", sublabel: "같은 파드의 컨테이너가 파일을 나눔", icon: "hard-drive", tone: "accent" },
              { label: "통째로 배치·소멸", sublabel: "한 노드에 함께, 죽으면 새로 생성", icon: "refresh", tone: "warning" },
            ],
            caption: "파드는 '함께 살고 함께 죽는' 컨테이너 묶음의 최소 단위입니다.",
          },
        },
        {
          slug: "kubectl-essentials",
          title: "kubectl 기본기: get·describe·logs·exec·apply·delete",
          minutes: 6,
          content: `Kubernetes와 대화하는 창구는 API 서버이고, 거기에 말을 걸어 주는 도구가 kubectl입니다. 명령은 수십 개지만 입문 단계의 90%는 여섯 개로 해결됩니다.

기본 꼴은 \`kubectl <동사> <리소스 종류> <이름> [옵션]\`. 리소스 종류는 \`pods\`·\`pod\`·\`po\`처럼 복수·단수·약어가 모두 통합니다.

## 조사하는 명령 (읽기 전용, 마음껏 쳐도 됨)

- \`kubectl get pods\` — 목록과 상태. \`-o wide\`면 노드와 IP까지.
- \`kubectl describe pod hello\` — 한 파드의 상세와 **Events**. 안 뜨는 파드는 여기부터.
- \`kubectl logs hello\` — 컨테이너의 표준 출력. \`-f\`로 실시간 추적, \`--previous\`로 죽기 직전 로그.
- \`kubectl exec -it hello -- sh\` — 컨테이너 안에 셸을 띄웁니다. \`--\` 뒤가 컨테이너 안에서 실행할 명령.

자동차 정비와 순서가 같습니다. 계기판(get) → 정비 기록(describe) → 블랙박스(logs) → 보닛 열기(exec).

## 바꾸는 명령

- \`kubectl apply -f 파일.yaml\` — 파일에 적힌 상태로 만들거나 갱신. 디렉터리를 주면 안의 YAML 전부.
- \`kubectl delete -f 파일.yaml\` 또는 \`kubectl delete pod hello\` — 삭제.

\`\`\`bash
kubectl get pods -o wide
kubectl describe pod hello | tail -20      # Events는 맨 아래에 있음
kubectl logs -f hello
kubectl exec -it hello -- sh               # 나올 때는 exit
kubectl port-forward pod/hello 8080:80     # http://localhost:8080 으로 확인
\`\`\`

\`port-forward\`는 내 컴퓨터 포트를 파드로 터널링합니다. Service 없이 "파드가 응답하나"를 확인하는 가장 빠른 방법입니다.

## 여기서 막힌다면

- \`error: unable to upgrade connection: container not found\` — 파드가 아직 Running이 아닙니다. \`get pods\`로 먼저 확인하세요.
- \`exec\`에서 \`sh: not found\` — Distroless처럼 셸이 없는 이미지입니다. \`kubectl debug\`로 임시 컨테이너를 붙이는 법은 마지막 레슨에서.

> 💡 **핵심**: 문제가 생기면 순서는 항상 **get → describe(Events) → logs → exec**입니다. 이 네 단계를 손이 기억하게 하세요.`,
          illustration: {
            type: "steps",
            title: "파드를 조사하는 네 단계",
            steps: [
              { label: "kubectl get pods", sublabel: "상태·재시작 횟수 한눈에", icon: "eye" },
              { label: "kubectl describe pod", sublabel: "Events에서 무슨 일이 있었나", icon: "search" },
              { label: "kubectl logs", sublabel: "-f 실시간 · --previous 직전 로그", icon: "file-text" },
              { label: "kubectl exec -it … -- sh", sublabel: "컨테이너 안에서 직접 확인", icon: "terminal" },
            ],
            caption: "위에서 아래로 갈수록 깊이 들어갑니다 — 앞 단계에서 답이 나오면 멈춰도 됩니다.",
          },
        },
        {
          slug: "deployments",
          title: "디플로이먼트: 원하는 개수만큼, 죽으면 다시",
          minutes: 7,
          content: `단독 파드는 죽으면 끝입니다. 아무도 되살려 주지 않습니다. 실무에서 앱을 배포하는 기본 단위는 파드가 아니라 **디플로이먼트**입니다 — 파드를 몇 개 유지할지 선언하면 그 개수를 지켜 주는 관리자입니다.

편의점 매대에 "삼각김밥은 항상 3개 진열"이라는 규칙이 있다고 합시다. 하나가 팔리면 직원이 창고에서 하나를 꺼내 채웁니다. 디플로이먼트가 그 직원입니다. \`replicas: 3\`이라고 적으면 파드가 죽든 노드가 사라지든 **항상 3개**를 맞춥니다.

## 세 겹 구조

디플로이먼트 → ReplicaSet → 파드. 디플로이먼트는 직접 파드를 만들지 않고 ReplicaSet에게 "이 템플릿으로 3개 유지해"라고 맡깁니다. 새 버전을 배포하면 **새 ReplicaSet**을 만들어 옮겨 갑니다 — 이 구조 덕분에 롤백이 가능합니다(모듈 3에서 실습).

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels: {app: web}     # 어떤 파드를 관리할지
  template:
    metadata:
      labels: {app: web}        # 만들 파드에 붙일 레이블
    spec:
      containers:
        - name: web
          image: nginx:1.27
\`\`\`

\`{app: web}\`은 \`app: web\`을 한 줄로 줄여 쓴 것입니다. 가장 많이 틀리는 곳은 \`selector.matchLabels\`와 \`template.metadata.labels\`입니다. **두 값은 반드시 같아야** 합니다. 셀렉터가 "app=web인 파드를 관리하겠다"고 하는데 템플릿이 그 레이블을 안 붙이면 apply 자체가 거부됩니다.

## 직접 확인하기

\`\`\`bash
kubectl apply -f deployment.yaml     # 위 내용을 deployment.yaml로 저장
kubectl get pods -l app=web          # 3개, 이름 뒤에 무작위 접미사
kubectl delete pod <파드 이름 하나>   # 일부러 하나 죽이기
kubectl get pods -l app=web          # 몇 초 뒤 다시 3개
kubectl scale deployment/web --replicas=5
\`\`\`

파드를 지운 직후 다시 \`get\`하면 새 이름의 파드가 \`ContainerCreating\`으로 올라옵니다. 이것이 조정 루프가 눈앞에서 도는 순간입니다.

## 여기서 막힌다면

- \`selector does not match template labels\` — 위에서 말한 두 레이블이 다릅니다. 철자와 들여쓰기를 대조하세요.
- 파드가 계속 \`Pending\` — 로컬 클러스터의 자원이 부족할 수 있습니다. replicas를 2로 줄여 보세요.

> 💡 **핵심**: 앱은 파드가 아니라 **디플로이먼트로** 배포합니다. \`replicas\` 한 줄이 "죽으면 다시"를 자동화합니다.`,
          illustration: {
            type: "flow",
            title: "디플로이먼트가 파드 개수를 지키는 흐름",
            nodes: [
              { label: "디플로이먼트", sublabel: "replicas: 3, 파드 템플릿", icon: "clipboard", tone: "primary" },
              { label: "ReplicaSet", sublabel: "app=web 파드가 3개인지 감시", icon: "eye", tone: "accent", edgeLabel: "템플릿 전달" },
              { label: "파드 × 3", sublabel: "web-7d9f…, web-b41c…, web-e02a…", icon: "boxes", tone: "success", edgeLabel: "부족하면 생성" },
              { label: "파드 1개 종료", sublabel: "노드 장애 · 수동 삭제 · 크래시", icon: "x", tone: "warning" },
            ],
            loopBack: { from: 3, to: 1, label: "3 ≠ 2 감지 → 새 파드 생성" },
            caption: "사람이 하는 일은 replicas 숫자를 정하는 것까지 — 나머지는 루프가 맡습니다.",
          },
          demo: {
            title: "디플로이먼트 만들고 파드를 죽여 보기",
            app: {
              kind: "code-editor",
              windowTitle: "deployment.yaml — 자동 복구 실습",
              files: [
                { id: "f-deploy", name: "deployment.yaml", active: true },
                { id: "f-pod", name: "pod.yaml" },
              ],
              code: [
                { id: "c1", text: "apiVersion: apps/v1" },
                { id: "c2", text: "kind: Deployment" },
                { id: "c3", text: "metadata:" },
                { id: "c4", text: "name: web", indent: 1 },
                { id: "c5", text: "spec:" },
                { id: "c6", text: "replicas: 3", indent: 1, tone: "add", hidden: true },
                { id: "c7", text: "selector:", indent: 1 },
                { id: "c8", text: "matchLabels:", indent: 2 },
                { id: "c9", text: "app: web", indent: 3 },
                { id: "c10", text: "template:", indent: 1 },
                { id: "c11", text: "metadata:", indent: 2 },
                { id: "c12", text: "labels:", indent: 3 },
                { id: "c13", text: "app: web", indent: 4 },
                { id: "c14", text: "spec:", indent: 2 },
                { id: "c15", text: "containers:", indent: 3 },
                { id: "c16", text: "- name: web", indent: 4 },
                { id: "c17", text: "image: nginx:1.27", indent: 5 },
              ],
              terminal: [
                { id: "t1", text: "kubectl apply -f deployment.yaml", tone: "cmd", hidden: true },
                { id: "t2", text: "deployment.apps/web created", tone: "ok", hidden: true },
                { id: "t3", text: "kubectl get pods -l app=web", tone: "cmd", hidden: true },
                { id: "t4", text: "NAME                   READY   STATUS    RESTARTS   AGE", tone: "out", hidden: true },
                { id: "t5", text: "web-7d9f6c8b5-2xk9p    1/1     Running   0          12s", tone: "ok", hidden: true },
                { id: "t6", text: "web-7d9f6c8b5-b41cq    1/1     Running   0          12s", tone: "ok", hidden: true },
                { id: "t7", text: "web-7d9f6c8b5-e02az    1/1     Running   0          12s", tone: "ok", hidden: true },
                { id: "t8", text: "kubectl delete pod web-7d9f6c8b5-2xk9p", tone: "cmd", hidden: true },
                { id: "t9", text: 'pod "web-7d9f6c8b5-2xk9p" deleted', tone: "out", hidden: true },
                { id: "t10", text: "kubectl get pods -l app=web", tone: "cmd", hidden: true },
                { id: "t11", text: "web-7d9f6c8b5-b41cq    1/1     Running             0          40s", tone: "ok", hidden: true },
                { id: "t12", text: "web-7d9f6c8b5-e02az    1/1     Running             0          40s", tone: "ok", hidden: true },
                { id: "t13", text: "web-7d9f6c8b5-m8s3v    0/1     ContainerCreating   0          2s", tone: "out", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 원하는 파드 개수를 선언합니다 (replicas: 3)" },
              { t: "move", target: "c5" },
              { t: "click" },
              { t: "type", target: "c6", text: "replicas: 3" },
              { t: "caption", text: "② selector와 template의 레이블이 같은지 확인하고 apply" },
              { t: "type", target: "t1", text: "kubectl apply -f deployment.yaml" },
              { t: "reveal", target: "t2" },
              { t: "caption", text: "③ 파드 3개가 무작위 접미사 이름으로 떠 있습니다" },
              { t: "type", target: "t3", text: "kubectl get pods -l app=web" },
              { t: "reveal", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "reveal", target: "t6" },
              { t: "reveal", target: "t7" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 일부러 파드 하나를 삭제합니다" },
              { t: "type", target: "t8", text: "kubectl delete pod web-7d9f6c8b5-2xk9p" },
              { t: "reveal", target: "t9" },
              { t: "caption", text: "⑤ 다시 조회 — 새 이름의 파드가 만들어지고 있습니다" },
              { t: "type", target: "t10", text: "kubectl get pods -l app=web" },
              { t: "reveal", target: "t11" },
              { t: "reveal", target: "t12" },
              { t: "reveal", target: "t13" },
              { t: "move", target: "t13" },
              { t: "caption", text: "✅ 3 ≠ 2를 감지해 자동 복구 — 조정 루프가 동작했습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "services",
          title: "Service(서비스): 파드가 바뀌어도 주소는 그대로",
          minutes: 6,
          content: `파드는 죽고 새로 생길 때마다 IP가 바뀝니다. 앞단 앱이나 사용자는 어디로 요청을 보내야 할까요? 이 문제를 푸는 것이 **Service**입니다.

## 회사 대표번호

담당 직원이 바뀌어도 회사 대표번호는 그대로입니다. 전화하면 근무 중인 누군가가 받습니다. Service는 파드 묶음의 대표번호입니다. **레이블 셀렉터**로 "app=web인 파드 전부"를 골라 고정 이름·IP를 주고, 요청을 살아 있는 파드 중 하나로 넘깁니다.

\`\`\`yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: ClusterIP
  selector:
    app: web
  ports:
    - port: 80          # Service가 받는 포트
      targetPort: 80    # 파드 컨테이너의 포트
\`\`\`

\`selector\` 값은 디플로이먼트 템플릿의 레이블과 같아야 합니다. 어긋나면 뒤에 파드가 없는 "빈 대표번호"가 됩니다.

apply 후 \`kubectl get svc web\`으로 CLUSTER-IP를, \`kubectl get endpointslices -l kubernetes.io/service-name=web\`으로 뒤에 붙은 파드 IP를 봅니다. 브라우저 확인은 \`kubectl port-forward svc/web 8080:80\`.

## 세 가지 타입

- **ClusterIP** (기본값) — 클러스터 **안에서만** 닿는 IP. 같은 네임스페이스에서는 \`http://web\`처럼 이름만으로 접속. 앱 사이 통신의 표준.
- **NodePort** — 모든 노드의 특정 포트(기본 30000~32767)를 열어 \`<노드IP>:<포트>\`로 접속. 테스트용.
- **LoadBalancer** — 클라우드 로드밸런서를 만들어 외부 IP를 붙입니다. 로컬 kind에서는 EXTERNAL-IP가 \`<pending>\`(별도 도구 필요).

실무 정석은 앱 사이는 ClusterIP, HTTP 외부 노출은 다음 모듈의 Gateway API입니다. LoadBalancer는 Gateway 하나에만 붙입니다.

## 여기서 막힌다면

- 접속은 되는데 응답이 없음 — \`targetPort\`가 컨테이너 포트와 다르거나 셀렉터 레이블이 파드와 다릅니다. endpointslices가 비면 후자.
- \`LoadBalancer\`가 \`<pending>\` — 로컬에서는 정상. port-forward나 NodePort로 확인하세요.

> 💡 **핵심**: Service는 **레이블로 고른 파드들의 고정 주소**입니다. 파드는 바뀌어도 이름 \`web\`은 바뀌지 않습니다.`,
          illustration: {
            type: "compare",
            title: "Service 타입 3종 — 누가 접속할 수 있나",
            columns: [
              {
                title: "ClusterIP (기본)",
                icon: "network",
                tone: "primary",
                items: ["클러스터 안에서만", "이름으로 접속: http://web", "앱 ↔ 앱 통신의 표준", "외부 노출 없음"],
              },
              {
                title: "NodePort",
                icon: "server",
                tone: "accent",
                items: ["모든 노드의 같은 포트 개방", "30000~32767 범위", "<노드IP>:<포트>로 접속", "테스트·임시 용도"],
              },
              {
                title: "LoadBalancer",
                icon: "cloud",
                tone: "warning",
                items: ["클라우드 로드밸런서 자동 생성", "외부 IP 부여", "로컬 kind에서는 <pending>", "Gateway 앞에 하나만"],
              },
            ],
            caption: "위 세 타입은 모두 같은 원리(셀렉터로 파드 고르기) 위에 '어디까지 열 것인가'만 다릅니다.",
          },
        },
        {
          slug: "configmaps-and-secrets",
          title: "ConfigMap과 Secret: 설정을 이미지에서 분리",
          minutes: 6,
          content: `Docker 입문에서 배운 원칙 하나 — 설정값은 이미지에 굽지 말고 환경변수로 넣는다. Kubernetes에는 그 상자가 둘 있습니다. 비밀이 아닌 것은 **ConfigMap**, 비밀인 것은 **Secret**.

## 냉장고 메모와 금고

ConfigMap은 냉장고에 붙인 메모입니다 — 누가 봐도 되는 값(로그 레벨, 기능 스위치, 외부 API 주소). Secret은 금고입니다 — 비밀번호, API 키, 인증서. 둘 다 파드 바깥에 두므로 **같은 이미지를 개발·스테이징·프로덕션에서 설정만 바꿔** 쓸 수 있습니다.

\`\`\`bash
kubectl create configmap app-config \\
  --from-literal=LOG_LEVEL=info --from-literal=FEATURE_X=on
kubectl create secret generic db-secret \\
  --from-literal=DB_PASSWORD='s3cret!'
kubectl get secret db-secret -o yaml    # data 값이 base64로 보임
\`\`\`

단, Secret은 암호화가 아닙니다. \`czNjcmV0IQ==\`는 **base64 인코딩**일 뿐이라 \`echo czNjcmV0IQ== | base64 -d\`로 누구나 되돌립니다. 기본 설정에서는 etcd에도 이 상태로 저장됩니다. Secret의 가치는 "숨김"이 아니라 **분리와 권한 제어**입니다 — 저장 시 암호화와 RBAC는 운영 강의에서 다룹니다.

## 파드에 주입하는 두 방법

\`\`\`yaml
    spec:
      containers:
        - name: web
          image: nginx:1.27
          envFrom:                      # ConfigMap의 모든 키를 환경변수로
            - configMapRef:
                name: app-config
          env:                          # Secret에서 키 하나만 골라서
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: DB_PASSWORD
\`\`\`

또 하나는 **볼륨 마운트**입니다. \`spec.volumes\`에 \`configMap: {name: app-config}\`를 두고 \`volumeMounts\`로 \`/etc/config\`에 붙이면 키마다 파일이 생깁니다. 설정 파일을 통째로 넣을 때 씁니다. 차이 하나 — **볼륨은 ConfigMap을 고치면 잠시 후 자동 갱신**되지만, 환경변수는 파드를 다시 만들어야 반영됩니다.

## 여기서 막힌다면

- \`CreateContainerConfigError\` — 참조한 ConfigMap이나 Secret이 없거나 키 이름이 다릅니다. \`kubectl get configmap,secret\`으로 존재와 이름을 확인하세요.
- 값을 바꿨는데 앱이 옛 값을 씀 — 환경변수 방식입니다. \`kubectl rollout restart deployment/web\`으로 파드를 새로 만드세요.

> 💡 **핵심**: 설정은 ConfigMap, 비밀은 Secret — 그리고 **Secret은 인코딩일 뿐 암호화가 아니라는 사실**을 잊지 마세요.`,
          illustration: {
            type: "compare",
            title: "ConfigMap vs Secret",
            columns: [
              {
                title: "ConfigMap",
                icon: "file-text",
                tone: "primary",
                items: ["로그 레벨·기능 스위치·URL", "평문으로 저장·조회", "Git에 넣어도 무방", "envFrom 또는 볼륨으로 주입"],
              },
              {
                title: "Secret",
                icon: "lock",
                tone: "warning",
                items: ["비밀번호·API 키·인증서", "base64 인코딩 (암호화 아님)", "Git에 넣으면 안 됨", "secretKeyRef 또는 볼륨으로 주입"],
              },
            ],
            caption: "주입 방법은 같고, 다른 것은 '누가 볼 수 있어야 하는가'입니다.",
          },
        },
        {
          slug: "namespaces-and-labels",
          title: "네임스페이스와 레이블: 정리 정돈의 기술",
          minutes: 5,
          content: `리소스가 수십 개만 되어도 \`kubectl get pods\` 결과가 한 화면을 넘칩니다. Kubernetes의 정리 도구는 둘 — 큰 칸막이 **네임스페이스**와 작은 꼬리표 **레이블**.

## 아파트 단지로 보기

네임스페이스는 아파트의 **동**입니다. 101동과 102동에 같은 호수(같은 이름의 리소스)가 있어도 충돌하지 않습니다. 팀별·환경별(dev/staging/prod)로 나누고 동마다 자원 한도·권한을 따로 둡니다. 레이블은 현관문의 **스티커**입니다. "app=web", "env=prod"처럼 여러 장을 붙이고 스티커 기준으로 골라 냅니다.

## 네임스페이스 다루기

\`default\`(별도 지정 없을 때), \`kube-system\`(Kubernetes 자체 구성요소), \`kube-public\`, \`kube-node-lease\` 네 개는 처음부터 있습니다. 지금까지 만든 것은 모두 \`default\`에 있습니다.

\`\`\`bash
kubectl create namespace shop
kubectl apply -f deployment.yaml -n shop      # 특정 네임스페이스에 생성
kubectl get pods -n shop                       # 그 네임스페이스만 조회
kubectl get pods -A                            # 모든 네임스페이스 (--all-namespaces)
kubectl config set-context --current --namespace=shop   # 기본 네임스페이스 변경
kubectl delete namespace shop                  # 안의 리소스가 통째로 삭제됨!
\`\`\`

\`-n\`을 빼먹은 "방금 만든 파드가 안 보여요"는 입문자 질문 1위입니다. 다른 네임스페이스의 Service는 \`web.shop.svc.cluster.local\`처럼 \`<Service 이름>.<네임스페이스>\`로 접속합니다. 노드나 네임스페이스처럼 **어느 동에도 속하지 않는** 전역 리소스도 있습니다(\`kubectl api-resources --namespaced=false\`).

## 레이블 다루기

디플로이먼트와 Service의 셀렉터가 레이블 기준이었죠. 조회에도 씁니다.

- \`kubectl get pods -l app=web\` — 조건 하나
- \`kubectl get pods -l 'app=web,env!=prod'\` — 여러 조건
- \`kubectl label pod hello tier=frontend\` — 나중에 추가
- \`kubectl get pods --show-labels\` — 레이블 전부 보기

\`app.kubernetes.io/name\` 같은 공식 권장 키를 쓰면 Helm 차트나 모니터링 도구가 자동으로 인식합니다.

> 💡 **핵심**: 네임스페이스로 **격리**하고 레이블로 **선택**합니다. 명령이 예상과 다르면 먼저 \`-n\`과 \`-l\`을 의심하세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "zsh — 네임스페이스와 레이블로 골라 보기",
            lines: [
              { text: "kubectl get pods", tone: "cmd" },
              { text: "No resources found in default namespace.", tone: "err" },
              { text: "# -n을 빼먹었다 — shop 네임스페이스에 만들었지", tone: "comment" },
              { text: "kubectl get pods -n shop -l app=web --show-labels", tone: "cmd" },
              { text: "NAME                  READY   STATUS    LABELS", tone: "dim" },
              { text: "web-7d9f6c8b5-b41cq   1/1     Running   app=web,pod-template-hash=7d9f6c8b5", tone: "out" },
              { text: "web-7d9f6c8b5-e02az   1/1     Running   app=web,pod-template-hash=7d9f6c8b5", tone: "out" },
              { text: "kubectl get namespaces", tone: "cmd" },
              { text: "NAME              STATUS   AGE", tone: "dim" },
              { text: "default           Active   2h", tone: "out" },
              { text: "kube-system       Active   2h", tone: "out" },
              { text: "shop              Active   5m", tone: "ok" },
            ],
            caption: "'No resources found'의 원인 대부분은 리소스가 없는 게 아니라 다른 네임스페이스를 보고 있는 것입니다.",
          },
        },
      ],
    },
    {
      slug: "expose-and-package",
      title: "외부 노출과 패키징",
      description: "Gateway API로 외부 접속, 롤링 업데이트와 롤백, Helm 차트 설치, 파드 진단",
      lessons: [
        {
          slug: "ingress-to-gateway-api",
          title: "외부에서 접속하기: Ingress에서 Gateway API로",
          minutes: 7,
          content: `Service의 ClusterIP는 클러스터 안에서만 통합니다. 브라우저가 \`https://shop.example.com\`으로 들어오면 누가 받아 어느 Service로 넘길까요? 이 '입구'가 지금 세대교체 중입니다.

## 백화점 안내데스크

정문 안내데스크는 "화장품은 1층, 식당은 6층"으로 안내합니다. Kubernetes에서 이 역할을 오래 맡아 온 것이 **Ingress**입니다 — 도메인·경로 규칙으로 HTTP 요청을 Service로 보냅니다. 단, 규칙일 뿐이라 트래픽을 받는 Ingress 컨트롤러는 따로 설치해야 했습니다.

## ingress-nginx는 은퇴했습니다

가장 널리 쓰이던 **ingress-nginx가 2026년 3월에 은퇴**했습니다. 저장소는 읽기 전용, 새 CVE 패치도 없습니다(계기: CVE-2025-1974). 공식 권고는 둘입니다.

- **Gateway API로 이전** — Ingress의 공식 후속 표준. \`ingress2gateway\` 도구가 기존 Ingress를 변환해 줍니다.
- 당장 어렵다면 **유지되는 다른 컨트롤러**(Traefik, HAProxy, Envoy Gateway 등)로 교체.

Ingress API는 남지만 기능이 동결되어, 새 프로젝트가 쓸 이유는 없습니다.

## Gateway API의 세 리소스와 설치

**GatewayClass**(어떤 구현체 — 인프라팀), **Gateway**(어느 포트의 입구 — 운영팀), **HTTPRoute**(어떤 경로를 어느 Service로 — 개발팀).

\`\`\`yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: web
spec:
  parentRefs:
    - name: my-gateway          # 붙일 Gateway 이름
  hostnames:
    - "shop.example.com"
  rules:
    - backendRefs:
        - name: web             # Service 이름
          port: 80
\`\`\`

Gateway API는 **내장되지 않은 애드온**이라 설치는 두 단계입니다. ① 공식 릴리스의 \`standard-install.yaml\`을 \`kubectl apply --server-side -f <URL>\`로 적용해 CRD를 설치하고, ② 구현체(Envoy Gateway, Traefik, Cilium, Istio 등)를 설치해야 HTTPRoute가 동작합니다. 구현체 대부분은 CRD도 함께 설치합니다.

> 💡 **핵심**: 외부 노출의 표준은 **Gateway API**입니다. 개발자 몫은 HTTPRoute 하나, 입구(Gateway)와 구현체는 팀이 한 번만 준비합니다.`,
          illustration: {
            type: "stack",
            title: "Gateway API의 역할 계층",
            layers: [
              {
                label: "HTTPRoute",
                sublabel: "개발팀 — 이 도메인·경로는 web Service로",
                icon: "route",
                tone: "primary",
              },
              {
                label: "Gateway",
                sublabel: "클러스터 운영팀 — 80/443 포트로 들어오는 입구",
                icon: "globe",
                tone: "accent",
              },
              {
                label: "GatewayClass",
                sublabel: "인프라팀 — 어떤 구현체(Envoy Gateway·Traefik 등)를 쓸지",
                icon: "settings",
                tone: "muted",
              },
              {
                label: "구현체(컨트롤러) + CRD",
                sublabel: "별도 설치 — Kubernetes 내장 아님",
                icon: "package",
                tone: "warning",
              },
            ],
            caption: "층마다 담당자가 달라서, 개발자는 맨 위 한 층만 알아도 배포할 수 있습니다.",
          },
        },
        {
          slug: "rolling-update-and-rollback",
          title: "롤링 업데이트와 롤백: 무중단 배포 첫 경험",
          minutes: 7,
          content: `새 버전을 배포하는데 서비스가 1초도 끊기지 않고, 문제가 생기면 한 줄로 되돌린다 — 디플로이먼트를 쓰는 진짜 이유입니다.

야간 교대 때 근무자 3명이 동시에 퇴근하면 창구가 빕니다. 새 근무자가 앉은 뒤에야 이전 근무자가 나갑니다. 디플로이먼트의 **롤링 업데이트**가 이 방식입니다. 새 ReplicaSet에 파드를 하나 만들고, 준비되면 옛 ReplicaSet의 파드를 하나 줄입니다. 기본값은 25%까지 더 만들고(\`maxSurge\`), 25%까지 부족해도 허용(\`maxUnavailable\`).

## 업데이트 실행과 관찰

\`\`\`bash
kubectl set image deployment/web web=nginx:1.28
kubectl rollout status deployment/web         # 교대 진행 상황을 끝까지 출력
kubectl get replicasets -l app=web            # 옛 RS는 0개, 새 RS는 3개
kubectl rollout history deployment/web
\`\`\`

\`set image\`의 \`web=\`은 컨테이너 이름입니다(이미지 이름이 아님). 실무 정석은 YAML의 \`image:\`를 고쳐 apply하는 것(이력이 Git에 남음). 이력에 설명을 남기려면 배포 전에 \`kubectl annotate deployment/web kubernetes.io/change-cause="nginx 1.28로 업데이트"\`를 적습니다(\`--record\` 옵션은 폐기).

## 잘못된 배포 되돌리기

일부러 없는 이미지 태그로 배포하면 새 파드가 \`ImagePullBackOff\`에 빠지고 \`rollout status\`가 멈춥니다. 그런데 **옛 파드들은 그대로 살아 있어** 서비스는 계속됩니다.

\`\`\`bash
kubectl set image deployment/web web=nginx:1.28-typo   # 일부러 없는 태그
kubectl rollout undo deployment/web               # 직전 리비전으로
kubectl rollout undo deployment/web --to-revision=1  # 특정 리비전으로
kubectl rollout status deployment/web
\`\`\`

롤백이 되는 이유는 옛 ReplicaSet을 보관하기 때문입니다(기본 10개, \`revisionHistoryLimit\`).

## 여기서 막힌다면

- \`rollout status\`가 \`Waiting for deployment "web" rollout to finish: 1 out of 3 new replicas have been updated...\`에서 안 넘어감 — 새 파드가 안 뜨는 것입니다. \`get pods\`로 STATUS를 보고, 필요하면 \`undo\`.
- \`undo\`했는데 파드가 그대로 — 이미 롤백된 상태이거나 리비전이 하나뿐입니다. \`rollout history\`로 확인하세요.

> 💡 **핵심**: 배포는 \`set image\`(또는 apply), 관찰은 \`rollout status\`, 후회는 \`rollout undo\`. 준비 안 된 파드로는 교대하지 않으므로 잘못된 배포에도 서비스는 살아 있습니다.`,
          illustration: {
            type: "steps",
            title: "배포 → 관찰 → 롤백의 한 사이클",
            steps: [
              { label: "새 이미지로 교체 지시", sublabel: "kubectl set image deployment/web web=nginx:1.28", icon: "upload" },
              { label: "교대 진행 관찰", sublabel: "kubectl rollout status — 새 파드 준비 후 옛 파드 종료", icon: "activity" },
              { label: "문제 감지", sublabel: "새 파드 ImagePullBackOff · 옛 파드는 계속 서비스", icon: "alert" },
              { label: "직전 리비전으로 되돌리기", sublabel: "kubectl rollout undo deployment/web", icon: "refresh" },
            ],
            caption: "3단계에서 서비스가 끊기지 않는 것이 롤링 업데이트의 안전장치입니다.",
          },
          demo: {
            title: "잘못된 이미지 배포 → 즉시 롤백",
            app: {
              kind: "code-editor",
              windowTitle: "터미널 — 롤링 업데이트와 롤백",
              files: [
                { id: "f-deploy", name: "deployment.yaml", active: true },
                { id: "f-svc", name: "service.yaml" },
              ],
              code: [
                { id: "c1", text: "# deployment.yaml (현재 클러스터 상태)", tone: "comment" },
                { id: "c2", text: "spec:" },
                { id: "c3", text: "replicas: 3", indent: 1 },
                { id: "c4", text: "template:", indent: 1 },
                { id: "c5", text: "spec:", indent: 2 },
                { id: "c6", text: "containers:", indent: 3 },
                { id: "c7", text: "- name: web", indent: 4 },
                { id: "c8", text: "image: nginx:1.27", indent: 5 },
              ],
              terminal: [
                { id: "t1", text: "kubectl set image deployment/web \\", tone: "cmd", hidden: true },
                { id: "t1b", text: "  web=nginx:1.28", tone: "cmd", hidden: true },
                { id: "t2", text: "deployment.apps/web image updated", tone: "ok", hidden: true },
                { id: "t3", text: "kubectl rollout status deployment/web", tone: "cmd", hidden: true },
                { id: "t4", text: 'Waiting for deployment "web" rollout to finish: 1 of 3 updated replicas are available...', tone: "out", hidden: true },
                { id: "t5", text: 'deployment "web" successfully rolled out', tone: "ok", hidden: true },
                { id: "t6", text: "kubectl set image deployment/web \\", tone: "cmd", hidden: true },
                { id: "t6b", text: "  web=nginx:1.28-typo", tone: "cmd", hidden: true },
                { id: "t7", text: "kubectl get pods -l app=web", tone: "cmd", hidden: true },
                { id: "t8", text: "web-5c8d7f9b4-q2w7x   0/1   ImagePullBackOff   0   30s", tone: "err", hidden: true },
                { id: "t9", text: "web-6b9c4d7f8-b41cq   1/1   Running            0   5m", tone: "out", hidden: true },
                { id: "t10", text: "web-6b9c4d7f8-e02az   1/1   Running            0   5m", tone: "out", hidden: true },
                { id: "t11", text: "kubectl rollout undo deployment/web", tone: "cmd", hidden: true },
                { id: "t12", text: "deployment.apps/web rolled back", tone: "ok", hidden: true },
                { id: "t13", text: "kubectl rollout history deployment/web", tone: "cmd", hidden: true },
                { id: "t14", text: "REVISION  CHANGE-CAUSE", tone: "out", hidden: true },
                { id: "t15", text: "3         <none>    ← 1.28-typo (실패)", tone: "out", hidden: true },
                { id: "t16", text: "4         <none>    ← 1.28 (롤백으로 복귀)", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 현재 이미지는 nginx:1.27 — 1.28로 올립니다" },
              { t: "type", target: "t1", text: "kubectl set image deployment/web \\" },
              { t: "type", target: "t1b", text: "  web=nginx:1.28" },
              { t: "reveal", target: "t2" },
              { t: "caption", text: "② rollout status로 교대가 끝날 때까지 지켜봅니다" },
              { t: "type", target: "t3", text: "kubectl rollout status deployment/web" },
              { t: "reveal", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "caption", text: "③ 이번엔 오타 난 이미지 태그로 배포해 봅니다" },
              { t: "type", target: "t6", text: "kubectl set image deployment/web \\" },
              { t: "type", target: "t6b", text: "  web=nginx:1.28-typo" },
              { t: "type", target: "t7", text: "kubectl get pods -l app=web" },
              { t: "reveal", target: "t8" },
              { t: "reveal", target: "t9" },
              { t: "reveal", target: "t10" },
              { t: "caption", text: "④ 새 파드는 실패했지만 옛 파드 2개가 서비스를 지킵니다" },
              { t: "caption", text: "⑤ 한 줄로 직전 리비전으로 되돌립니다" },
              { t: "type", target: "t11", text: "kubectl rollout undo deployment/web" },
              { t: "reveal", target: "t12" },
              { t: "type", target: "t13", text: "kubectl rollout history deployment/web" },
              { t: "reveal", target: "t14" },
              { t: "reveal", target: "t15" },
              { t: "reveal", target: "t16" },
              { t: "caption", text: "✅ 롤백 완료 — 서비스는 한 번도 끊기지 않았습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "helm-intro",
          title: "Helm 입문: 남이 만든 Helm 차트 설치하기",
          minutes: 6,
          content: `모니터링 도구 하나에 매니페스트가 30개라면? 하나하나 apply하고 환경마다 값을 바꾸는 일은 사람이 할 일이 아닙니다. **Helm**은 Kubernetes의 패키지 관리자입니다 — 매니페스트 묶음의 \`brew\`·\`npm\`입니다.

**Helm 차트**는 밀키트입니다. 재료(매니페스트 템플릿)와 기본 레시피(\`values.yaml\`)가 한 상자에 있고, "매운맛으로, 2인분"처럼 **값만 바꿔** 조리합니다. 설치 결과물 하나가 **릴리스**(release)이며, 한 Helm 차트로 여럿 만들 수 있습니다.

## 생명주기 다섯 명령

\`\`\`bash
brew install helm                                    # macOS
helm repo add podinfo https://stefanprodan.github.io/podinfo
helm repo update
helm search repo podinfo                             # 어떤 Helm 차트가 있나
helm show values podinfo/podinfo                     # 바꿀 수 있는 값 목록
helm install demo podinfo/podinfo -n demo --create-namespace \\
  --set replicaCount=2
helm list -n demo                                    # 릴리스 확인
kubectl get pods -n demo                             # 파드 확인
\`\`\`

\`install demo podinfo/podinfo\`는 "podinfo 저장소의 podinfo Helm 차트를 \`demo\` 릴리스로 설치", \`-n demo --create-namespace\`는 "네임스페이스를 만들어 그 안에 넣기"입니다.

값이 여럿이면 \`--set\` 대신 \`my-values.yaml\`(예: \`replicaCount: 3\`)을 \`-f\`로 넘기고 Git에서 관리합니다.

\`\`\`bash
helm upgrade demo podinfo/podinfo -n demo -f my-values.yaml   # 값·버전 변경
helm history demo -n demo                                     # 릴리스 리비전
helm rollback demo 1 -n demo                                  # 리비전 1로
helm uninstall demo -n demo                                   # 리소스 통째로 삭제
\`\`\`

## Helm 4의 변화

2025년 11월에 나온 Helm 4도 위 명령 문법은 같습니다. 바뀐 건 안쪽입니다 — 새 릴리스는 **server-side apply**가 기본이고 \`--wait\`가 상태를 더 정확히 판정합니다. 바뀐 플래그는 둘: \`--atomic\` → \`--rollback-on-failure\`, \`--force\` → \`--force-replace\`(옛 이름도 경고 후 동작). Helm 3용 Helm 차트는 그대로 설치됩니다. Helm 3는 2026년 9월 최종 릴리스, 보안 패치는 2027년 초 종료 — 새로 시작한다면 Helm 4를 쓰세요.

## 여기서 막힌다면

- \`Error: INSTALLATION FAILED: cannot re-use a name that is still in use\` — 같은 이름의 릴리스가 이미 있습니다. \`helm list -A\`로 찾아 \`upgrade\`하거나 이름을 바꾸세요.
- 설치는 됐는데 파드가 안 뜸 — 파드의 문제입니다. 다음 레슨의 진단 순서를 적용하세요.

> 💡 **핵심**: Helm 차트 = 매니페스트 묶음 + 기본값. \`install\`로 시작해 \`upgrade\`로 값을 바꾸고 \`uninstall\`로 흔적 없이 지웁니다.`,
          illustration: {
            type: "cycle",
            title: "Helm 릴리스의 생명주기",
            center: "릴리스 하나 = 리비전 이력",
            nodes: [
              { label: "repo add · search", sublabel: "Helm 차트 찾기", icon: "search" },
              { label: "show values", sublabel: "바꿀 값 확인", icon: "eye" },
              { label: "install -n --set/-f", sublabel: "릴리스 생성", icon: "download" },
              { label: "upgrade -f", sublabel: "값·버전 변경", icon: "refresh" },
              { label: "rollback · uninstall", sublabel: "되돌리거나 정리", icon: "x" },
            ],
            caption: "값 파일을 고치고 upgrade하는 3→4 구간을 가장 자주 돌게 됩니다.",
          },
        },
        {
          slug: "pod-troubleshooting-and-next",
          title: "파드가 안 뜰 때: Pending·CrashLoopBackOff·ImagePullBackOff",
          minutes: 7,
          content: `\`kubectl get pods\`의 STATUS 열은 첫 진단서입니다. 상태 이름만 읽어도 원인의 절반은 찾은 것입니다.

## 병원 트리아지처럼

응급실은 환자를 보자마자 증상으로 분류해 처치실을 정합니다. 파드도 STATUS로 **배치 실패(Pending), 이미지 실패(ImagePull…), 시작 후 크래시(CrashLoop…)** 셋 중 어디인지 먼저 가르고, 맞는 명령을 씁니다.

## 상태별 원인과 첫 명령

- **Pending** — 스케줄러가 노드를 못 찾았습니다. \`describe\`의 Events에 \`Insufficient memory\`처럼 이유가 적힙니다. 원인은 CPU·메모리 부족, PVC 미바인딩, 테인트 불일치.
- **ImagePullBackOff / ErrImagePull** — 이미지 이름·이미지 태그 오타, 비공개 레지스트리 인증 누락, pull 한도 초과. Events의 \`Failed to pull image\` 뒤에 이유가 나옵니다.
- **CrashLoopBackOff** — 시작 직후 죽기를 반복합니다. \`kubectl logs <파드> --previous\`로 **죽기 직전 로그**를 봅니다. 원인은 설정 누락, DB 연결 실패, 잘못된 시작 명령이 대부분.
- **OOMKilled** — \`describe\`에 \`Reason: OOMKilled\`, \`Exit Code: 137\`로 드러납니다. 메모리 한도를 올립니다.

\`\`\`bash
kubectl get pods -o wide                         # STATUS · RESTARTS · 노드
kubectl describe pod web-5c8d7f9b4-q2w7x | tail -25   # Events는 맨 아래
kubectl logs web-5c8d7f9b4-q2w7x --previous      # 직전 컨테이너의 마지막 로그
kubectl events --for pod/web-5c8d7f9b4-q2w7x     # 이벤트만 시간순으로
kubectl debug -it web-5c8d7f9b4-q2w7x --image=busybox --target=web   # 셸 없는 이미지에 임시 컨테이너
\`\`\`

## 다음 단계

프로덕션은 질문이 다릅니다 — 리소스 한도, 프로브, 노드 장애 생존, 권한 분리.

- **"Kubernetes 운영: 프로덕션 클러스터 설계와 관리"** — requests/limits·프로브·오토스케일링·RBAC·GitOps.
- **"Datadog 입문: 서비스 모니터링 시작하기"** — 클러스터와 앱이 지금 정상인지 밖에서 보는 눈.

> 💡 **핵심**: STATUS로 분류하고, **Pending은 describe, ImagePull은 Events, CrashLoop은 logs --previous**. 이 세 갈래면 입문 단계 고장은 거의 다 잡습니다.`,
          illustration: {
            type: "flow",
            title: "파드 진단 트리아지",
            nodes: [
              { label: "kubectl get pods", sublabel: "STATUS · RESTARTS 확인", icon: "eye", tone: "primary" },
              { label: "Pending → describe Events", sublabel: "Insufficient cpu/memory · PVC 미바인딩 · 테인트", icon: "clock", tone: "warning", edgeLabel: "배치가 안 됨" },
              { label: "ImagePullBackOff → Events", sublabel: "이미지 이름·이미지 태그 오타 · 인증 · pull 한도", icon: "download", tone: "warning", edgeLabel: "이미지를 못 받음" },
              { label: "CrashLoopBackOff → logs --previous", sublabel: "설정 누락 · DB 연결 실패 · OOMKilled(137)", icon: "bug", tone: "warning", edgeLabel: "시작 후 죽음" },
              { label: "원인 수정 → apply", sublabel: "매니페스트를 고치고 다시 선언", icon: "check", tone: "success" },
            ],
            loopBack: { from: 4, to: 0, label: "다시 get pods로 확인" },
            caption: "세 갈래 중 어디인지만 가르면, 다음에 칠 명령은 자동으로 정해집니다.",
          },
        },
      ],
    },
  ],
};
