import type { Course } from "../types";

/**
 * Kubernetes 운영 (인프라 & DevOps 5/6단계) — kubernetes-basics를 마친 사람이 프로덕션 클러스터를 설계·운영하기 위한 심화 강의.
 *
 * 사실 검증 메모 (2026-09 기준 웹 검색):
 * - QoS 클래스 판정: 모든 컨테이너의 CPU·메모리 requests=limits → Guaranteed, 하나라도 request/limit 있으면 Burstable, 전무 → BestEffort.
 *   노드 압박 시 축출 순서 BestEffort → Burstable → Guaranteed (kubernetes.io/docs/concepts/workloads/pods/pod-qos)
 * - 메모리 limit 초과 → OOM kill(OOMKilled), CPU limit 초과 → 스로틀링(죽이지 않음). 스케줄러는 requests만 본다 (kubernetes.io manage-resources-containers)
 *   CPU limit 미설정 권고는 Kubernetes 초기 핵심 개발자 Tim Hockin 발언 등 실무 진영의 주장이며 공식 문서의 강제 규칙은 아님 → 완곡 표현 (GKE 문서 근거는 확인 못해 삭제)
 * - 프로브: 핸들러 httpGet/tcpSocket/exec/grpc, 기본값 initialDelaySeconds 0 · periodSeconds 10 · timeoutSeconds 1 · failureThreshold 3 · successThreshold 1,
 *   startupProbe 성공 전까지 liveness/readiness 비활성, 최대 대기 = failureThreshold × periodSeconds, HTTP 200~399 성공 (kubernetes.io configure-liveness-readiness-startup-probes)
 * - HPA autoscaling/v2: scaleTargetRef, minReplicas/maxReplicas, metrics[].type Resource → target.type Utilization/averageUtilization, metrics-server 필요 (kubernetes.io HPA walkthrough)
 * - VPA: 같은 지표(CPU/메모리)로 HPA와 동시 사용 금지, Auto/Recreate 모드는 파드 재생성, InPlaceOrRecreate는 VPA 1.6+ GA (github.com/kubernetes/autoscaler known-limitations, features)
 *   인플레이스 파드 리사이즈는 Kubernetes 1.35에서 stable (kubernetes.io resize-container-resources)
 * - Karpenter: 스케줄 불가 파드를 보고 노드를 즉시 프로비저닝·통합(consolidation), NodePool + 클라우드별 NodeClass(EC2NodeClass 등) CRD, 스팟 지원.
 *   AWS·Azure가 대표 제공자, GCP·Alibaba·OCI 등은 커뮤니티/벤더 유지 제공자 (karpenter.sh, github.com/kubernetes-sigs/karpenter README) — "GKE 공식 제공자 없음" 단정 표현은 삭제
 * - KEDA: ScaledObject가 워크로드와 이벤트 소스를 연결, 0→1은 KEDA가 1→N은 KEDA가 만든 HPA가 담당, 2023-08-22 CNCF 졸업 (keda.sh, cncf.io)
 * - PDB policy/v1: minAvailable 또는 maxUnavailable 중 하나만, 정수/백분율, 백분율은 올림. kubectl drain은 PDB를 존중 (kubernetes.io configure-pdb, safely-drain-node)
 * - topologySpreadConstraints: maxSkew·topologyKey·whenUnsatisfiable(DoNotSchedule/ScheduleAnyway)·labelSelector, 표준 키 topology.kubernetes.io/zone, kubernetes.io/hostname
 * - 테인트: kubectl taint nodes <노드> key=value:NoSchedule, 효과 NoSchedule/PreferNoSchedule/NoExecute, toleration operator Equal/Exists (kubernetes.io taint-and-toleration)
 * - PV/PVC: accessModes RWO/ROX/RWX/RWOP, reclaimPolicy Retain/Delete(StorageClass 기본 Delete), volumeBindingMode Immediate/WaitForFirstConsumer,
 *   기본 클래스 애노테이션 storageclass.kubernetes.io/is-default-class (kubernetes.io persistent-volumes, storage-classes)
 * - StatefulSet: 순번 이름(web-0…), 헤드리스 Service(clusterIP: None) 필요, DNS <pod>.<svc>.<ns>.svc.cluster.local, volumeClaimTemplates가 파드별 PVC 생성,
 *   persistentVolumeClaimRetentionPolicy whenDeleted/whenScaled (kubernetes.io statefulset)
 * - Job backoffLimit 기본 6, restartPolicy Never/OnFailure만. CronJob schedule·timeZone·concurrencyPolicy Allow(기본)/Forbid/Replace·startingDeadlineSeconds (kubernetes.io job, cron-jobs)
 * - RBAC: rbac.authorization.k8s.io/v1, RoleBinding은 Role 또는 ClusterRole 참조 가능, ClusterRoleBinding은 ClusterRole만. kubectl auth can-i … --as=system:serviceaccount:<ns>:<sa> (kubernetes.io rbac)
 * - ServiceAccount 토큰 자동 마운트: automountServiceAccountToken: false를 SA 또는 파드 spec에, 파드 spec이 우선 (kubernetes.io configure-service-account)
 * - NetworkPolicy default-deny: podSelector: {} + policyTypes [Ingress, Egress], 규칙은 가산적, CNI 플러그인이 지원해야 동작 (kubernetes.io network-policies)
 * - Pod Security Admission: 1.25 stable, 레벨 privileged/baseline/restricted, 모드 enforce/audit/warn, 레이블 pod-security.kubernetes.io/<mode>(-version).
 *   restricted는 runAsNonRoot·allowPrivilegeEscalation false·capabilities drop ALL·seccomp RuntimeDefault 요구 (kubernetes.io pod-security-admission, pod-security-standards)
 * - helm create 산출물: Chart.yaml, values.yaml, .helmignore, charts/, templates/{deployment,service,ingress,httproute,hpa,serviceaccount}.yaml, NOTES.txt, _helpers.tpl, tests/test-connection.yaml
 *   values 기본 키 replicaCount·image.repository/tag·service.type/port·ingress.enabled·httpRoute.enabled·autoscaling.enabled·resources (github.com/helm/helm pkg/chart/v2/util/create.go)
 * - Helm 4 (2025-11-12 출시, helm.sh/blog/helm-4-released, helm.sh/docs/overview): 신규 설치는 서버측 적용(SSA) 기본, 업그레이드는 이전 릴리스의 적용 방식을 따름(--server-side true/false/auto),
 *   kstatus 기반 리소스 감시로 --wait 개선('watcher' 전략), 플러그인 시스템 재설계(선택적 WebAssembly 런타임, CLI/getter/post-renderer 3종, post-renderer는 플러그인으로만),
 *   slog 로깅, 콘텐츠 기반 로컬 캐시, 재현 가능한 차트 아카이브, 다중 차트 API 버전 지원 SDK(v3 차트는 실험 단계, v2 차트 그대로 동작)
 * - Helm 3 EOL (helm.sh/blog/helm-v3-end-of-life, 2026-06-02): 마지막 제한적 기능 릴리스 2026-09-09, 보안 패치 2027-02-10 종료
 * - Argo CD: Application CRD argoproj.io/v1alpha1, spec.project/source(repoURL·targetRevision·path)/destination(server·namespace)/syncPolicy.automated(prune·selfHeal)/syncOptions CreateNamespace=true.
 *   설치 kubectl apply -n argocd --server-side --force-conflicts -f …/stable/manifests/install.yaml, 초기 비밀번호 argocd admin initial-password -n argocd,
 *   포트포워드 svc/argocd-server 8080:443, UI '+ New App' → 'Sync' → 'Synchronize'. 동기화 상태 Synced/OutOfSync, 헬스 Healthy/Progressing/Degraded/Suspended/Missing/Unknown (argo-cd.readthedocs.io)
 * - Argo Rollouts: kind Rollout(argoproj.io/v1alpha1) strategy.canary.steps[setWeight, pause{duration}/pause{}], blueGreen activeService(필수)/previewService/autoPromotionEnabled(기본 true)/scaleDownDelaySeconds(기본 30),
 *   kubectl argo rollouts get rollout <이름> --watch / promote / abort (argo-rollouts.readthedocs.io)
 * - Kubernetes 지원 정책: 최근 3개 마이너 유지(1.37·1.36·1.35 + 유지보수 모드의 1.34), 마이너당 약 14개월(12개월 + 2개월 유지보수), kube-apiserver는 마이너 건너뛰기 금지,
 *   업그레이드 순서 kube-apiserver → 기타 컨트롤 플레인 → kubelet/kube-proxy, kubelet은 최대 3마이너 낮아도 됨 (kubernetes.io version-skew-policy, patch-releases)
 * - OpenCost: 벤더 중립 오픈소스 비용 측정 도구, Kubecost가 시작, 2024-10-25 CNCF 인큐베이팅 (opencost.io, cncf.io)
 */
export const kubernetesProduction: Course = {
  slug: "kubernetes-production",
  title: "Kubernetes 운영: 프로덕션 클러스터 설계와 관리",
  subtitle: "리소스·프로브·오토스케일링·보안·GitOps — 실서비스를 견디는 클러스터의 설계 원칙",
  description:
    "kubectl apply가 성공했다고 서비스가 안전한 것은 아닙니다. 트래픽이 몰리면 OOMKilled로 죽고, 배포할 때마다 몇 초씩 502가 나고, 노드 하나가 점검에 들어가면 서비스가 통째로 사라지는 클러스터는 '동작하는' 클러스터일 뿐 '운영 가능한' 클러스터가 아닙니다. 이 강의는 입문 강의와 실제 프로덕션 사이의 간극을 채웁니다. requests·limits와 QoS 클래스, 프로브 3종, HPA·VPA·Karpenter·KEDA, PDB와 토폴로지 분산, 영구 저장소와 StatefulSet, RBAC·NetworkPolicy·Pod Security Admission, 그리고 Helm 차트 직접 만들기와 Argo CD GitOps, Argo Rollouts 점진 배포, 버전 정책과 비용 최적화까지 — 운영자가 매일 마주치는 결정을 근거와 함께 익힙니다.",
  category: "devops",
  level: "advanced",
  tags: ["Kubernetes", "K8s 운영", "Helm", "GitOps", "Argo CD", "오토스케일링"],
  gradient: ["#1d4ed8", "#312e81"],
  icon: "boxes",
  outcomes: [
    "requests·limits와 QoS 클래스를 이해하고 OOMKilled·스로틀링을 예방하는 리소스 설정을 할 수 있다",
    "프로브 3종·PDB·토폴로지 분산으로 배포 중에도, 노드 장애 중에도 끊기지 않는 워크로드를 설계할 수 있다",
    "HPA·VPA·Cluster Autoscaler/Karpenter·KEDA의 역할을 구분해 상황에 맞는 오토스케일링을 고를 수 있다",
    "RBAC·NetworkPolicy·Pod Security Admission으로 최소 권한 클러스터를 구성할 수 있다",
    "Helm 차트를 직접 작성하고 Argo CD·Argo Rollouts로 GitOps 기반 점진 배포 파이프라인을 운영할 수 있다",
  ],
  modules: [
    {
      slug: "reliability",
      title: "안정성 설계",
      description: "리소스, 프로브, 오토스케일링, 중단 예산 — 죽지 않는 워크로드의 조건",
      lessons: [
        {
          slug: "production-readiness",
          title: "프로덕션 준비도 체크리스트: 입문과 운영의 간극",
          minutes: 4,
          content: `입문 강의에서 띄운 디플로이먼트는 \`kubectl get pods\`에 **Running**이라고 뜹니다. 그 상태로 실서비스 트래픽을 받으면 어떻게 될까요? 대부분은 첫 주 안에 다음 셋 중 하나를 겪습니다.

## 입문 클러스터가 프로덕션에서 깨지는 3가지 방식

- **조용히 죽는다** — 리소스 제한이 없어 파드 하나가 노드 메모리를 다 먹고, 이웃 파드까지 OOMKilled로 쓰러집니다.
- **배포할 때마다 끊긴다** — 준비 안 된 파드에 트래픽이 들어가 롤링 업데이트마다 몇 초씩 502가 납니다.
- **노드 점검 한 번에 사라진다** — 레플리카 3개가 모두 같은 노드에 있어, 그 노드를 비우는 순간 서비스가 0개가 됩니다.

새집 입주 전 **사전점검**과 같습니다. 문이 열리고 불이 켜지는 것(Running)과, 누수·전기 용량까지 확인한 것(운영 준비)은 다른 이야기입니다.

## 이 강의의 로드맵

1. **안정성 설계 (모듈 1)** — requests·limits, 프로브 3종, 오토스케일링, PDB·어피니티·토폴로지 분산
2. **상태와 보안 (모듈 2)** — PV·PVC·StorageClass, StatefulSet·DaemonSet·Job·CronJob, RBAC, NetworkPolicy·Pod Security Admission
3. **배포와 운영 (모듈 3)** — Helm 차트 직접 만들기, Argo CD GitOps, Argo Rollouts 점진 배포, 버전 정책·비용 최적화

## 운영자의 체크리스트

- 모든 컨테이너에 requests·limits가 있고, QoS 클래스를 알고 정했는가?
- readinessProbe가 있는가? liveness가 너무 공격적이지 않은가?
- 레플리카가 노드·존에 분산되고, PDB가 있는가?
- 파드가 필요 이상의 권한(RBAC·네트워크·호스트 접근)을 갖지 않는가?
- 배포가 Git 이력으로 추적되고, 실패 시 자동으로 되돌아가는가?

> 💡 **핵심**: 프로덕션 준비도는 "떠 있는가"가 아니라 **"죽었을 때, 배포할 때, 몰릴 때 어떻게 되는가"**에 답할 수 있는 상태입니다.`,
          illustration: {
            type: "grid",
            title: "프로덕션 준비도 5개 영역",
            items: [
              { label: "리소스", sublabel: "requests·limits·QoS", icon: "cpu", tone: "primary" },
              { label: "헬스", sublabel: "프로브 3종", icon: "activity", tone: "primary" },
              { label: "확장·중단 내성", sublabel: "HPA·PDB·분산", icon: "scaling", tone: "accent" },
              { label: "상태 저장", sublabel: "PV·StatefulSet", icon: "hard-drive", tone: "accent" },
              { label: "보안", sublabel: "RBAC·NetworkPolicy·PSA", icon: "shield", tone: "warning" },
              { label: "배포·운영", sublabel: "Helm·GitOps·업그레이드", icon: "rocket", tone: "success" },
            ],
            caption: "Running 한 단어 뒤에 숨은 여섯 영역 — 어느 하나가 비면 그곳에서 첫 장애가 납니다.",
          },
        },
        {
          slug: "resources-and-qos",
          title: "리소스 requests·limits와 QoS 클래스: OOMKilled 예방",
          minutes: 6,
          content: `프로덕션 장애 1순위는 화려한 버그가 아니라 **리소스 설정 누락**입니다. requests와 limits 두 줄이 파드의 배치와 생사를 결정합니다.

## requests와 limits는 하는 일이 다릅니다

- **requests** — 스케줄러가 노드를 고를 때 보는 **예약량**. 노드의 남은 requests가 부족하면 파드는 Pending에 머뭅니다.
- **limits** — 실행 중 넘을 수 없는 **상한**. 메모리 limit을 넘으면 컨테이너가 죽고(OOMKilled), CPU limit을 넘으면 죽이지 않고 **스로틀링**합니다.

\`\`\`yaml
resources:
  requests:
    cpu: 250m        # 0.25코어
    memory: 256Mi
  limits:
    memory: 256Mi    # 메모리는 request와 같게
\`\`\`

## QoS 클래스: 노드가 부족할 때 누가 먼저 쫓겨나나

- **Guaranteed** — 모든 컨테이너가 CPU·메모리 **requests = limits**. 가장 마지막에 축출.
- **Burstable** — request 또는 limit이 하나라도 있지만 Guaranteed는 아님. 중간 순위.
- **BestEffort** — requests·limits가 전혀 없음. 노드가 압박받으면 **가장 먼저** 축출.

\`kubectl get pod <이름> -o jsonpath='{.status.qosClass}'\`로 확인합니다. 비행기 오버부킹과 같습니다 — 스탠바이(BestEffort)부터 내립니다.

## CPU limit 논쟁, 현재의 권고

- **requests는 반드시** 설정합니다. 없으면 스케줄러가 눈을 감고 배치합니다.
- **메모리는 requests = limits**가 안전합니다. 압축이 안 되므로 넘치면 죽는 것 외에 답이 없습니다.
- **CPU limit은 신중히** 정합니다. Kubernetes 초기 핵심 개발자 Tim Hockin을 비롯한 많은 실무자가 "CPU는 request만, limit은 없거나 넉넉히"를 권합니다. 단, 여러 팀이 한 노드를 공유해 이웃을 보호해야 하면 limit이 필요합니다. 공식 문서의 강제 규칙은 아니므로 **팀의 우선순위로 결정**하세요.

> 💡 **핵심**: requests는 배치, limits는 생사를 결정합니다. **메모리는 request=limit, CPU는 request 필수·limit은 근거를 갖고** — OOMKilled와 스로틀링을 함께 줄이는 출발점입니다.`,
          illustration: {
            type: "compare",
            title: "QoS 클래스 3종 — 축출 순서",
            columns: [
              {
                title: "BestEffort",
                icon: "alert",
                tone: "warning",
                items: ["requests·limits 없음", "배치 예측 불가", "노드 압박 시 1순위 축출", "프로덕션에선 금지"],
              },
              {
                title: "Burstable",
                icon: "gauge",
                tone: "accent",
                items: ["request 또는 limit 일부", "request 이상 사용 시 축출 후보", "2순위 축출", "대부분의 웹 앱"],
              },
              {
                title: "Guaranteed",
                icon: "shield",
                tone: "primary",
                items: ["모든 컨테이너 requests=limits", "예약량이 곧 상한", "마지막에 축출", "DB·핵심 컴포넌트"],
              },
            ],
            caption: "같은 노드가 흔들릴 때 어떤 파드가 남을지는 코드가 아니라 이 두 줄의 조합이 정합니다.",
          },
        },
        {
          slug: "probes",
          title: "프로브 3종: liveness·readiness·startup을 잘못 쓰면 생기는 일",
          minutes: 7,
          content: `"배포할 때마다 30초쯤 502가 나요" — 대부분 **readinessProbe가 없거나 잘못된** 탓입니다. 프로브는 컨테이너에 던지는 세 가지 질문입니다.

## 세 가지 질문, 세 가지 결과

- **livenessProbe** — "살아 있나?" 실패하면 **재시작**합니다.
- **readinessProbe** — "준비 됐나?" 실패하면 Service(서비스)에서 **빼서 트래픽을 끊습니다**.
- **startupProbe** — "켜지는 중인가?" 성공할 때까지 위 두 프로브를 **잠재웁니다**.

핸들러는 \`httpGet\`(200~399 성공)·\`tcpSocket\`·\`exec\`·\`grpc\`, 기본값은 \`periodSeconds\` 10·\`timeoutSeconds\` 1·\`failureThreshold\` 3입니다.

\`\`\`yaml
# Deployment의 containers[] 항목 아래에 추가
readinessProbe:
  httpGet: { path: /ready, port: 8080 }
  periodSeconds: 5
  failureThreshold: 3
livenessProbe:
  httpGet: { path: /healthz, port: 8080 }
  periodSeconds: 10
  failureThreshold: 3
startupProbe:
  httpGet: { path: /healthz, port: 8080 }
  periodSeconds: 5
  failureThreshold: 30   # 최대 150초 부팅 허용
\`\`\`

## 잘못 쓰면 이렇게 됩니다

- **liveness가 공격적** → 잠깐의 GC 멈춤에도 재시작되는 **재시작 폭풍**.
- **liveness가 DB까지 검사** → DB 장애가 앱 전체 재시작으로 번집니다. liveness는 **프로세스 자신만**, 의존성은 readiness에서.

병원 트리아지와 같습니다 — readiness는 "진료 가능한가", liveness는 "심정지인가".

## 따라 하기

1. readinessProbe를 추가하고 \`kubectl apply -f deployment.yaml && kubectl rollout status deployment/<이름>\`.
2. 옆 터미널에서 \`curl\`을 0.5초마다 반복해 200만 나오는지 봅니다.

**여기서 막힌다면**
- \`0/1 Running\`이 계속되면 \`kubectl describe pod\`의 Events 확인 — \`Readiness probe failed: ... statuscode: 404\`면 경로 오타.
- \`Liveness probe failed: ... context deadline exceeded\`가 반복되면 \`timeoutSeconds\`를 3~5초로.

> 💡 **핵심**: readiness는 **트래픽 스위치**, liveness는 **재시작 버튼**, startup은 **부팅 유예**. 하나만 둔다면 readiness입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "kubectl — readinessProbe 추가 후 롤링 업데이트",
            lines: [
              { text: "kubectl apply -f deployment.yaml", tone: "cmd" },
              { text: "deployment.apps/shop-web configured", tone: "out" },
              { text: "kubectl rollout status deployment/shop-web", tone: "cmd" },
              { text: "Waiting for deployment \"shop-web\" rollout to finish: 1 of 3 updated replicas are available...", tone: "dim" },
              { text: "Waiting for deployment \"shop-web\" rollout to finish: 2 of 3 updated replicas are available...", tone: "dim" },
              { text: "deployment \"shop-web\" successfully rolled out", tone: "ok" },
              { text: "# 옆 터미널의 curl 루프", tone: "comment" },
              { text: "200 200 200 200 200 200 200 200", tone: "ok" },
              { text: "kubectl get pods -l app=shop-web", tone: "cmd" },
              { text: "shop-web-7d9f6c8b5-2kx9p   1/1   Running   0   42s", tone: "out" },
              { text: "shop-web-7d9f6c8b5-8qhzt   1/1   Running   0   31s", tone: "out" },
              { text: "shop-web-7d9f6c8b5-mv4rc   1/1   Running   0   20s", tone: "out" },
            ],
            caption: "준비된 파드만 엔드포인트에 들어가니 교체 중에도 502가 한 번도 섞이지 않습니다.",
          },
          demo: {
            title: "readinessProbe 추가 → 무중단 롤아웃 확인",
            app: {
              kind: "code-editor",
              windowTitle: "deployment.yaml — shop-web",
              files: [
                { id: "f-deploy", name: "deployment.yaml", active: true },
                { id: "f-svc", name: "service.yaml" },
                { id: "f-values", name: "kustomization.yaml" },
              ],
              code: [
                { id: "c1", text: "containers:" },
                { id: "c2", text: "- name: web", indent: 1 },
                { id: "c3", text: "image: ghcr.io/acme/shop-web:2.4.1", indent: 2 },
                { id: "c4", text: "ports:", indent: 2 },
                { id: "c5", text: "- containerPort: 8080", indent: 2 },
                { id: "c6", text: "readinessProbe:", indent: 2, tone: "add", hidden: true },
                { id: "c7", text: "httpGet: { path: /ready, port: 8080 }", indent: 3, tone: "add", hidden: true },
                { id: "c8", text: "periodSeconds: 5", indent: 3, tone: "add", hidden: true },
                { id: "c9", text: "failureThreshold: 3", indent: 3, tone: "add", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "kubectl apply -f deployment.yaml", tone: "cmd", hidden: true },
                { id: "t2", text: "deployment.apps/shop-web configured", tone: "out", hidden: true },
                { id: "t3", text: "kubectl rollout status deploy/shop-web", tone: "cmd", hidden: true },
                { id: "t4", text: "Waiting for rollout to finish: 1 of 3 updated replicas are available...", tone: "out", hidden: true },
                { id: "t5", text: "Waiting for rollout to finish: 2 of 3 updated replicas are available...", tone: "out", hidden: true },
                { id: "t6", text: "deployment \"shop-web\" successfully rolled out", tone: "ok", hidden: true },
                { id: "t7", text: "# curl 루프: 200 200 200 200 200 200 200 200", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 지금은 프로브가 없어 뜨는 즉시 트래픽이 들어갑니다" },
              { t: "move", target: "c5" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 컨테이너 항목 아래에 readinessProbe를 추가합니다" },
              { t: "type", target: "c6", text: "readinessProbe:" },
              { t: "type", target: "c7", text: "httpGet: { path: /ready, port: 8080 }" },
              { t: "type", target: "c8", text: "periodSeconds: 5" },
              { t: "type", target: "c9", text: "failureThreshold: 3" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 적용하고 롤아웃 진행을 지켜봅니다" },
              { t: "type", target: "t1", text: "kubectl apply -f deployment.yaml" },
              { t: "reveal", target: "t2" },
              { t: "type", target: "t3", text: "kubectl rollout status deploy/shop-web" },
              { t: "reveal", target: "t4" },
              { t: "wait", ms: 600 },
              { t: "reveal", target: "t5" },
              { t: "wait", ms: 600 },
              { t: "reveal", target: "t6" },
              { t: "caption", text: "④ 옆 터미널의 curl 루프는 교체 중에도 200만 찍습니다" },
              { t: "reveal", target: "t7" },
              { t: "move", target: "t7" },
              { t: "caption", text: "✅ 준비된 파드만 트래픽을 받아 무중단 배포 완성" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "autoscaling",
          title: "오토스케일링: HPA·VPA·Cluster Autoscaler/Karpenter·KEDA 언제 무엇을",
          minutes: 6,
          content: `오토스케일링 도구가 다섯 개나 되는 이유는 **"무엇을 늘리는가"가 다르기 때문**입니다. 파드 개수, 파드 크기, 노드 개수, 그리고 이벤트 — 축이 네 개입니다.

## 파드를 늘린다·키운다: HPA와 VPA

HPA는 CPU 사용률 같은 지표를 보고 **레플리카 수**를 조절합니다. 기준이 requests 대비 백분율이므로 requests가 없으면 동작하지 않고, metrics-server가 필요합니다.

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: shop-web }
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: shop-web
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target: { type: Utilization, averageUtilization: 60 }
\`\`\`

VPA는 개수 대신 **파드 하나의 requests**를 실사용량에 맞춥니다. \`updateMode: "Off"\`면 값을 바꾸지 않고 **추천만** 합니다. 공식 문서대로 **같은 지표(CPU·메모리)로 HPA와 함께 쓰지 말고**, Auto/Recreate 모드는 파드를 재생성하므로 PDB와 함께 쓰세요.

## 노드를 늘린다: Cluster Autoscaler vs Karpenter

- **Cluster Autoscaler** — 클라우드의 **노드 그룹** 단위로 노드를 늘리고 줄입니다.
- **Karpenter** — Pending 파드의 요구(CPU·메모리·아키텍처·스팟)에 **딱 맞는 노드를 즉시** 만들고, 노는 노드는 통합(consolidation)해 없앱니다. NodePool과 클라우드별 NodeClass(예: EC2NodeClass) CRD로 정의합니다. AWS·Azure가 대표 제공자이고, 그 외는 공식 저장소를 확인하세요.

## 이벤트로 늘린다: KEDA

큐 길이·Prometheus 지표·cron 시각 같은 **외부 이벤트**로 스케일하며, **0개까지 줄일 수 있습니다**. ScaledObject가 워크로드와 이벤트 소스를 연결하고, 내부적으로 HPA를 만들어 1→N은 HPA에게, 0↔1은 KEDA가 직접 담당합니다.

식당으로 비유하면 HPA는 **웨이터 수**, VPA는 **웨이터 한 명의 역량**, Cluster Autoscaler/Karpenter는 **홀 크기**, KEDA는 **예약 건수를 보고 미리 출근시키는 매니저**입니다.

> 💡 **핵심**: HPA(개수)·VPA(크기)·Karpenter/CA(노드)·KEDA(이벤트)는 **다른 축**입니다. 웹 앱은 HPA + 노드 오토스케일러, 큐 소비자는 KEDA, requests 산정은 VPA 추천 모드부터.`,
          illustration: {
            type: "stack",
            title: "오토스케일링 4개 층",
            layers: [
              { label: "이벤트 · KEDA", sublabel: "큐 길이·요청 수·cron → 0개까지 축소", icon: "zap", tone: "accent" },
              { label: "파드 개수 · HPA", sublabel: "CPU·메모리·커스텀 지표 → 레플리카 수", icon: "scaling", tone: "primary" },
              { label: "파드 크기 · VPA", sublabel: "실사용량 → requests 조정(추천 모드 권장)", icon: "gauge", tone: "primary" },
              { label: "노드 개수 · Cluster Autoscaler / Karpenter", sublabel: "Pending 파드 → 노드 추가·통합", icon: "server", tone: "muted" },
            ],
            caption: "위쪽 층이 파드를 늘려도 아래층(노드)이 따라오지 않으면 Pending만 늘어납니다.",
          },
        },
        {
          slug: "pdb-affinity-topology",
          title: "PDB·어피니티·테인트·토폴로지 분산: 노드 하나가 죽어도 살아남기",
          minutes: 6,
          content: `레플리카 3개를 띄웠는데 셋이 모두 같은 노드에 올라갔다면, 그 노드가 죽는 순간 레플리카는 0개입니다. 개수만으로는 안전하지 않습니다 — **어디에 놓이는가**와 **한 번에 몇 개까지 빼도 되는가**를 함께 정해야 합니다.

## PDB: 한 번에 빼도 되는 개수

PDB는 노드 점검(\`kubectl drain\`)이나 오토스케일러의 노드 축소 같은 **자발적 중단** 때 "최소 몇 개는 남겨 둬"를 선언합니다. drain은 PDB를 위반하는 축출을 하지 않고 기다립니다.

\`\`\`yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: shop-web
spec:
  minAvailable: 2          # 또는 maxUnavailable: 1 (둘 중 하나만)
  selector:
    matchLabels:
      app: shop-web
\`\`\`

값은 정수 또는 \`"50%"\` 같은 백분율(올림 처리)입니다. 단, 노드가 갑자기 죽는 **비자발적 장애**는 PDB가 막지 못합니다 — 그건 배치 규칙의 몫입니다.

## 배치 규칙 3종

- **topologySpreadConstraints** — 같은 레이블의 파드를 존·노드마다 **최대 1개 차이**로 고르게 퍼뜨립니다.
- **어피니티** — nodeAffinity는 "SSD 노드에만", podAntiAffinity는 "같은 노드에 같은 앱 두 개 금지". \`required…\`는 강제, \`preferred…\`는 선호.
- **테인트·톨러레이션** — 노드에 \`kubectl taint nodes gpu-1 gpu=true:NoSchedule\`을 붙이면, 같은 키를 \`tolerations\`에 가진 파드만 올라갑니다. 효과는 NoSchedule·PreferNoSchedule·NoExecute(기존 파드도 내보냄).

\`\`\`yaml
# Deployment의 template.spec 아래
topologySpreadConstraints:
- maxSkew: 1
  topologyKey: topology.kubernetes.io/zone
  whenUnsatisfiable: DoNotSchedule
  labelSelector:
    matchLabels:
      app: shop-web
\`\`\`

계란을 한 바구니에 담지 말라는 말 그대로입니다. 토폴로지 분산이 **바구니를 나누고**, PDB가 **한 번에 옮길 계란 수**를 정합니다.

## 함께 쓸 때의 함정

- PDB의 \`minAvailable\`이 레플리카 수와 같으면(3 중 3) drain이 영원히 끝나지 않습니다.
- \`whenUnsatisfiable: DoNotSchedule\`은 조건을 못 맞추면 Pending을 만듭니다. 존이 2개인 클러스터에서 존 3개 분산을 요구하지 마세요.

> 💡 **핵심**: 레플리카 수는 시작일 뿐입니다. **토폴로지 분산으로 퍼뜨리고, PDB로 한 번에 빼는 수를 제한하고, 테인트로 특수 노드를 지키면** 노드 하나는 언제 죽어도 됩니다.`,
          illustration: {
            type: "flow",
            title: "노드 점검(drain) 시 무슨 일이 일어나나",
            nodes: [
              { label: "kubectl drain node-b", sublabel: "노드 비우기 요청", icon: "wrench", tone: "muted" },
              { label: "PDB 확인", sublabel: "minAvailable: 2 — 지금 3개 가동", icon: "shield", tone: "warning", edgeLabel: "축출 API 호출" },
              { label: "파드 1개 축출", sublabel: "2개 남음 → 허용", icon: "x", tone: "accent", edgeLabel: "예산 내" },
              { label: "다른 존 노드에 재배치", sublabel: "topologySpread·antiAffinity 준수", icon: "route", tone: "primary" },
              { label: "3개 복구 → 다음 파드 축출", sublabel: "노드가 빌 때까지 반복", icon: "check", tone: "success" },
            ],
            loopBack: { from: 4, to: 1, label: "예산이 회복되면 다음 축출" },
            caption: "PDB는 '몇 개를 남길지', 분산 규칙은 '어디로 갈지'를 정해 점검 중에도 서비스가 유지됩니다.",
          },
        },
      ],
    },
    {
      slug: "state-and-security",
      title: "상태와 보안",
      description: "데이터를 잃지 않는 저장소 설계와 최소 권한 클러스터",
      lessons: [
        {
          slug: "persistent-storage",
          title: "PV·PVC·StorageClass: 상태 있는 워크로드의 저장소",
          minutes: 5,
          content: `파드는 언제든 죽고 다시 태어나며, 그 안에 쓴 파일은 함께 사라집니다. **파드보다 오래 살아야 하는 데이터**는 파드 바깥에 두어야 하고, Kubernetes는 이를 세 오브젝트로 나눕니다.

## 세 오브젝트의 역할 분담

- **PV** — 실제 디스크 한 덩어리. 클러스터 자원입니다.
- **PVC** — "10Gi, 읽기·쓰기 한 노드"처럼 앱이 내는 **신청서**. 파드는 PV가 아니라 PVC를 참조합니다.
- **StorageClass** — 디스크의 **종류와 만드는 방법**. PVC가 들어오면 이 정의대로 PV를 **자동 생성**합니다(동적 프로비저닝).

호텔에 비유하면 PVC는 **예약 요청**, StorageClass는 **객실 등급표**, PV는 **배정된 방**입니다.

\`\`\`yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shop-db-data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: fast-ssd     # 생략하면 기본 StorageClass
  resources:
    requests:
      storage: 20Gi
\`\`\`

## 운영자가 꼭 정해야 하는 세 가지

- **accessModes** — \`ReadWriteOnce\`(한 노드에서 읽기·쓰기, 블록 디스크의 기본)·\`ReadOnlyMany\`·\`ReadWriteMany\`(여러 노드 동시 쓰기, NFS류 필요)·\`ReadWriteOncePod\`(단일 파드만). 블록 스토리지에 RWX를 요구하면 PVC가 영원히 Pending입니다.
- **reclaimPolicy** — PVC를 지웠을 때 PV의 운명. 기본값 \`Delete\`는 디스크까지 지우니, 프로덕션 DB는 \`Retain\`으로 바꿔 실수로 PVC를 지워도 데이터가 남게 하세요.
- **volumeBindingMode** — \`Immediate\`는 PVC 생성 즉시, \`WaitForFirstConsumer\`는 파드가 스케줄될 때까지 기다려 **파드와 같은 존**에 디스크를 만듭니다. 멀티 존에서 후자가 아니면 "디스크는 A존, 파드는 B존"이 됩니다.

기본 StorageClass는 \`storageclass.kubernetes.io/is-default-class: "true"\` 애노테이션으로 지정하고 \`kubectl get storageclass\`에 \`(default)\`로 표시됩니다.

> 💡 **핵심**: 앱은 PVC만 알고, 디스크의 정체는 StorageClass가 숨깁니다. 프로덕션에서는 **Retain, WaitForFirstConsumer, 올바른 accessModes** 세 값을 먼저 확인하세요.`,
          illustration: {
            type: "steps",
            title: "동적 프로비저닝의 흐름",
            steps: [
              { label: "PVC 생성", sublabel: "20Gi · RWO · fast-ssd", icon: "file-text" },
              { label: "StorageClass 조회", sublabel: "프로비저너·등급·바인딩 모드", icon: "layers" },
              { label: "프로비저너가 PV 생성", sublabel: "클라우드 디스크 실제 발급", icon: "hard-drive" },
              { label: "PVC ↔ PV Bound", sublabel: "1:1 결합", icon: "link" },
              { label: "파드에 마운트", sublabel: "volumes.persistentVolumeClaim", icon: "package" },
            ],
            caption: "WaitForFirstConsumer면 3단계가 파드 스케줄 뒤로 밀려 디스크와 파드가 같은 존에 놓입니다.",
          },
        },
        {
          slug: "stateful-workloads",
          title: "StatefulSet·DaemonSet·Job·CronJob: 디플로이먼트가 아닌 것들",
          minutes: 6,
          content: `디플로이먼트는 "구별되지 않는 파드 N개"용입니다. DB 노드는 서로 구별되어야 하고, 로그 수집기는 노드마다 하나씩, 야간 정산은 끝나면 종료되어야 합니다 — 각각 다른 컨트롤러가 있습니다.

## StatefulSet: 이름과 디스크가 있는 파드

- 파드 이름이 \`db-0, db-1, db-2\`처럼 **순번**으로 고정되고, 재생성돼도 같은 이름·같은 PVC를 다시 받습니다.
- \`volumeClaimTemplates\`가 파드마다 PVC를 **하나씩 자동 생성**합니다. 스케일 다운·삭제 후에도 PVC는 남습니다(\`persistentVolumeClaimRetentionPolicy\`로 조절).
- **헤드리스 Service**(\`clusterIP: None\`)가 필요합니다. \`db-0.db.prod.svc.cluster.local\`처럼 파드별 고정 DNS 이름이 생겨 복제본끼리 서로를 찾습니다.

학급 번호표와 같습니다. 디플로이먼트는 "아무나 3명", StatefulSet은 "1번·2번·3번" — 결석해도 번호와 사물함(PVC)은 그대로입니다.

## DaemonSet: 노드마다 정확히 하나

새 노드가 추가되면 파드가 하나 생기고, 노드가 빠지면 함께 사라집니다. 노드 상태 테인트(not-ready 등)의 톨러레이션은 자동으로 붙지만, **컨트롤 플레인 노드의 테인트**(\`node-role.kubernetes.io/control-plane\`)는 직접 적어야 그곳에도 뜹니다.

## Job·CronJob: 끝이 있는 작업

Job은 파드가 **성공 종료**할 때까지 재시도합니다. \`restartPolicy\`는 \`Never\` 또는 \`OnFailure\`만 가능하고, \`backoffLimit\`(기본 6)을 넘기면 실패입니다. CronJob은 정해진 시각에 Job을 만듭니다.

\`\`\`yaml
apiVersion: batch/v1
kind: CronJob
metadata: { name: nightly-report }
spec:
  schedule: "0 3 * * *"          # 매일 03:00
  timeZone: "Asia/Seoul"
  concurrencyPolicy: Forbid       # 이전 실행이 안 끝났으면 건너뜀
  jobTemplate:
    spec:
      backoffLimit: 2
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - { name: report, image: ghcr.io/acme/report:1.8 }
\`\`\`

\`concurrencyPolicy\`는 \`Allow\`(기본, 겹쳐 실행)·\`Forbid\`·\`Replace\`(이전 것을 죽이고 새로 시작). 동시에 돌면 안 되는 정산·백업은 반드시 \`Forbid\`로 두세요.

> 💡 **핵심**: 구별되는 파드 → StatefulSet, 노드마다 하나 → DaemonSet, 끝이 있는 일 → Job/CronJob. **디플로이먼트가 아닌 것을 디플로이먼트로 만드는 순간** 데이터가 섞이고 배치가 겹칩니다.`,
          illustration: {
            type: "grid",
            title: "워크로드 컨트롤러 선택 지도",
            items: [
              { label: "디플로이먼트", sublabel: "구별 없는 파드 N개 · 웹·API", icon: "boxes", tone: "primary" },
              { label: "StatefulSet", sublabel: "순번 이름 + 전용 PVC · DB·큐", icon: "database", tone: "accent" },
              { label: "DaemonSet", sublabel: "노드마다 1개 · 로그·모니터링", icon: "server", tone: "accent" },
              { label: "Job", sublabel: "성공까지 재시도 후 종료 · 마이그레이션", icon: "check", tone: "success" },
              { label: "CronJob", sublabel: "시각 예약 · 정산·백업", icon: "timer", tone: "success" },
              { label: "헤드리스 Service", sublabel: "clusterIP: None · 파드별 DNS", icon: "network", tone: "muted" },
            ],
            caption: "질문은 하나 — '이 파드들은 서로 구별되어야 하는가, 노드마다 있어야 하는가, 끝나야 하는가'.",
          },
        },
        {
          slug: "rbac-and-service-accounts",
          title: "RBAC와 ServiceAccount: 최소 권한 원칙",
          minutes: 6,
          content: `입문 때 쓰던 kubeconfig는 대개 **cluster-admin**, 클러스터의 모든 것을 할 수 있는 열쇠입니다. 팀원과 CI 파이프라인, 앱 파드 수십 개가 모두 그 열쇠를 들고 있다면 사고는 시간 문제입니다.

## RBAC의 네 조각

- **Role / ClusterRole** — 권한 목록. Role은 **네임스페이스 안**, ClusterRole은 **클러스터 전체**.
- **RoleBinding / ClusterRoleBinding** — 권한을 주체(사용자·그룹·ServiceAccount)에 **연결**. RoleBinding은 ClusterRole도 참조할 수 있어 "공용 읽기 권한을 이 네임스페이스에만 부여"가 가능합니다.

호텔 카드키와 같습니다. Role은 "3층 객실 문 열기"라는 **권한 규격**, RoleBinding은 그 규격을 **특정 손님 카드에 굽는 일**입니다.

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata: { name: pod-reader, namespace: shop }
rules:
- apiGroups: [""]                 # "" = core 그룹
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata: { name: ci-pod-reader, namespace: shop }
subjects:
- { kind: ServiceAccount, name: ci-bot, namespace: shop }
roleRef: { kind: Role, name: pod-reader, apiGroup: rbac.authorization.k8s.io }
\`\`\`

확인은 \`kubectl auth can-i\`로 직접 물어봅니다.

- \`kubectl auth can-i list secrets --as=system:serviceaccount:shop:ci-bot\`
- \`kubectl auth can-i --list -n shop\` — 내가 가진 권한 전체

## 파드의 신원, ServiceAccount

파드는 기본적으로 \`default\` ServiceAccount 토큰을 \`/var/run/secrets/kubernetes.io/serviceaccount/\`에 **자동 마운트**합니다. API를 호출하지 않는 웹 앱에도 토큰이 들어가 있고, 컨테이너가 뚫리면 그것이 첫 발판이 됩니다.

- API를 쓰지 않는 앱은 파드 spec 또는 ServiceAccount에 \`automountServiceAccountToken: false\`를 둡니다(파드 spec 값이 우선).
- API를 쓰는 앱은 **전용 ServiceAccount**에 필요한 동사만 담은 Role을 바인딩합니다. \`default\` 계정에 권한을 주는 것은 네임스페이스 전체에 주는 것과 같습니다.

> 💡 **핵심**: cluster-admin은 사람 한두 명에게만. 나머지는 **네임스페이스 Role + 전용 ServiceAccount**, 확신이 없으면 \`kubectl auth can-i\`로 물어보세요.`,
          illustration: {
            type: "compare",
            title: "Role vs ClusterRole — 범위와 용도",
            columns: [
              {
                title: "Role + RoleBinding",
                icon: "key",
                tone: "primary",
                items: ["네임스페이스 하나에 한정", "파드·디플로이먼트·ConfigMap 등", "팀별 개발자·앱 ServiceAccount", "최소 권한의 기본 단위"],
              },
              {
                title: "ClusterRole + ClusterRoleBinding",
                icon: "globe",
                tone: "warning",
                items: ["클러스터 전체", "노드·네임스페이스·PV 등 전역 리소스", "클러스터 운영자·오퍼레이터", "cluster-admin은 극소수만"],
              },
              {
                title: "ClusterRole + RoleBinding",
                icon: "link",
                tone: "accent",
                items: ["권한 정의는 공용, 부여는 네임스페이스", "예: 공용 'view' 역할을 shop에만", "중복 Role 작성 방지", "실무에서 가장 많이 쓰는 조합"],
              },
            ],
            caption: "권한 정의(Role류)와 부여(Binding류)를 분리하면 같은 규격을 여러 곳에 안전하게 재사용할 수 있습니다.",
          },
        },
        {
          slug: "network-policy-and-pod-security",
          title: "NetworkPolicy와 Pod Security Admission: 기본은 '전부 허용'이다",
          minutes: 6,
          content: `Kubernetes의 기본값은 **모든 파드가 서로 통신 가능**, **루트 실행·권한 상승 허용**입니다. 프론트엔드 하나가 뚫리면 DB까지 한 번에 닿습니다.

## NetworkPolicy: 파드 사이의 방화벽

NetworkPolicy는 레이블로 고른 파드에 "이 트래픽만 허용"을 붙입니다. 허용 규칙에 없는 것은 **전부 차단**, 여러 정책은 합집합입니다. 정석은 **default-deny를 먼저 깔고** 필요한 경로만 여는 것.

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: shop
spec:
  podSelector: {}          # 네임스페이스의 모든 파드
  policyTypes: ["Ingress", "Egress"]
\`\`\`

그다음 "web → api 8080", "api → db 5432", "모든 파드 → kube-dns 53"을 엽니다. **DNS 허용을 잊으면** 이름 해석이 전부 실패합니다.

NetworkPolicy는 **CNI 플러그인이 구현**합니다. 미지원 플러그인(kind 기본 포함)에선 아무 일도 없으니, 로컬 실습은 Calico나 Cilium에서 하세요.

## Pod Security Admission: 레이블 하나로 위험한 파드 거부

- **레벨** — \`privileged\`(제한 없음) · \`baseline\`(privileged 컨테이너·hostNetwork·hostPath 등 금지) · \`restricted\`(baseline + 비루트·allowPrivilegeEscalation: false·capabilities 전부 drop·seccomp RuntimeDefault).
- **모드** — \`enforce\`(거부) · \`audit\`(감사 로그만) · \`warn\`(경고만).

\`\`\`bash
kubectl label ns shop pod-security.kubernetes.io/enforce=baseline pod-security.kubernetes.io/warn=restricted
\`\`\`

이제 baseline 위반은 **생성 거부**, restricted 위반은 **경고만**. 기존 워크로드가 많다면 warn/audit로 목록을 먼저 확보한 뒤 enforce로 올리세요.

아파트로 비유하면 NetworkPolicy는 **동 사이 출입문 통제**, Pod Security Admission은 **입주 심사**입니다.

> 💡 **핵심**: 새 네임스페이스에는 **default-deny NetworkPolicy**와 **pod-security 레이블(baseline enforce + restricted warn)**을 함께 붙이세요. 기본값은 '전부 허용'입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "kubectl — Pod Security Admission 경고와 거부",
            lines: [
              { text: "kubectl label ns shop pod-security.kubernetes.io/enforce=baseline pod-security.kubernetes.io/warn=restricted", tone: "cmd" },
              { text: "namespace/shop labeled", tone: "out" },
              { text: "kubectl apply -f web.yaml -n shop", tone: "cmd" },
              { text: "Warning: would violate PodSecurity \"restricted:latest\": allowPrivilegeEscalation != false (container \"web\" must set securityContext.allowPrivilegeEscalation=false), unrestricted capabilities (container \"web\" must set securityContext.capabilities.drop=[\"ALL\"]), runAsNonRoot != true", tone: "err" },
              { text: "deployment.apps/web created", tone: "ok" },
              { text: "kubectl apply -f debug-privileged.yaml -n shop", tone: "cmd" },
              { text: "Error from server (Forbidden): error when creating \"debug-privileged.yaml\": pods \"debug\" is forbidden: violates PodSecurity \"baseline:latest\": privileged (container \"debug\" must not set securityContext.privileged=true)", tone: "err" },
              { text: "# warn 레벨은 경고만, enforce 레벨은 거부", tone: "comment" },
            ],
            caption: "warn은 고칠 목록을 알려 주고 enforce는 문을 닫습니다 — 순서대로 올리면 무중단으로 강화할 수 있습니다.",
          },
        },
      ],
    },
    {
      slug: "delivery-and-operations",
      title: "배포와 운영",
      description: "Helm 차트 작성, GitOps, 점진적 배포, 업그레이드와 비용",
      lessons: [
        {
          slug: "helm-chart-authoring",
          title: "Helm 차트 직접 만들기: values·템플릿·Helm 4에서 달라진 점",
          minutes: 7,
          content: `우리 앱의 매니페스트 여러 장을 **하나의 Helm 차트**로 묶어 dev·staging·prod에 값만 바꿔 배포합니다.

## \`helm create shop-web\`이 만들어 주는 뼈대

- \`Chart.yaml\` — 이름·\`version\`(Helm 차트 버전)·\`appVersion\`(앱 버전).
- \`values.yaml\` — \`replicaCount\`·\`image.repository\`/\`tag\`·\`resources\` 등 기본값.
- \`templates/\` — deployment·service 등 템플릿, \`NOTES.txt\`, 공용 함수 \`_helpers.tpl\`.

## 템플릿 문법과 배포 명령

\`\`\`yaml
# templates/deployment.yaml 일부
metadata:
  name: {{ include "shop-web.fullname" . }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  template:
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
\`\`\`

- \`{{ .Values.x }}\`는 values.yaml의 값, \`{{ .Chart.Name }}\`은 Helm 차트 정보, \`include\`는 \`_helpers.tpl\`의 정의 호출.

레시피(템플릿)와 재료(values)를 나눈 요리책 — 같은 레시피로 2인분(dev)도 20인분(prod)도.

검사·렌더링·배포는 세 명령입니다. \`--install\` 덕분에 첫 배포와 업그레이드가 같은 명령입니다.

\`\`\`bash
helm lint ./shop-web                  # 문법 검사
helm template shop-web ./shop-web     # 렌더링 결과 확인
helm upgrade --install shop-web ./shop-web -n shop --create-namespace -f values-prod.yaml --wait
# -f로 환경별 values를 겹치고, --set image.tag=2.4.1로 값 하나만 덮어쓰기
\`\`\`

## Helm 4에서 달라진 점 (2025-11 출시)

- **서버측 적용(SSA) 기본** — 새 설치는 SSA, Helm 3 시절 릴리스는 업그레이드 시 이전 방식 유지(\`--server-side true|false|auto\`).
- **\`--wait\` 개선** — kstatus 기반 감시로 준비 상태를 더 정확히 판단합니다(예전 방식 \`--wait=legacy\`).
- **플러그인 재설계** — post-renderer를 **플러그인 이름**으로 지정합니다.
- **Helm 3 EOL** — 2026-09-09 마지막 릴리스, **2027-02-10까지 보안 패치만**.

**여기서 막힌다면**
- \`invalid ownership metadata\` — 같은 이름의 리소스가 Helm 밖에 이미 있음. \`--take-ownership\`으로 소유권을 가져오세요.
- \`nil pointer evaluating interface\` — values 경로 오타(예: \`.Values.image.tags\`). \`helm template\`으로 먼저 확인하세요.

> 💡 **핵심**: Helm 차트는 **템플릿 + values(환경별 값)**. \`helm create\` → \`helm template\`/\`lint\` → \`helm upgrade --install\`이 매 배포의 루틴입니다.`,
          illustration: {
            type: "steps",
            title: "Helm 차트 작성에서 배포까지",
            steps: [
              { label: "helm create shop-web", sublabel: "Chart.yaml · values.yaml · templates/", icon: "package" },
              { label: "values·템플릿 수정", sublabel: "image·replicaCount·resources", icon: "file-pen" },
              { label: "helm lint / helm template", sublabel: "문법 검사 · 렌더링 결과 확인", icon: "search" },
              { label: "helm upgrade --install", sublabel: "-f values-prod.yaml --wait", icon: "rocket" },
              { label: "helm history / rollback", sublabel: "리비전 단위로 되돌리기", icon: "refresh" },
            ],
            caption: "렌더링 결과를 눈으로 확인하는 3단계를 건너뛰면 실수는 클러스터에서 발견됩니다.",
          },
          demo: {
            title: "helm create → values 수정 → upgrade --install",
            app: {
              kind: "code-editor",
              windowTitle: "values.yaml — shop-web Helm 차트",
              files: [
                { id: "f-chart", name: "Chart.yaml" },
                { id: "f-values", name: "values.yaml", active: true },
                { id: "f-deploy", name: "templates/deployment.yaml" },
                { id: "f-helpers", name: "templates/_helpers.tpl" },
              ],
              code: [
                { id: "c1", text: "replicaCount: 1", tone: "del" },
                { id: "c2", text: "replicaCount: 3", tone: "add", hidden: true },
                { id: "c3", text: "image:" },
                { id: "c4", text: "repository: nginx", indent: 1, tone: "del" },
                { id: "c5", text: "repository: ghcr.io/acme/shop-web", indent: 1, tone: "add", hidden: true },
                { id: "c6", text: "tag: \"\"", indent: 1, tone: "del" },
                { id: "c7", text: "tag: \"2.4.1\"", indent: 1, tone: "add", hidden: true },
                { id: "c8", text: "service:" },
                { id: "c9", text: "type: ClusterIP", indent: 1 },
                { id: "c10", text: "port: 80", indent: 1 },
              ],
              terminal: [
                { id: "t1", text: "helm create shop-web", tone: "cmd", hidden: true },
                { id: "t2", text: "Creating shop-web", tone: "out", hidden: true },
                { id: "t3", text: "helm lint ./shop-web", tone: "cmd", hidden: true },
                { id: "t4", text: "1 chart(s) linted, 0 chart(s) failed", tone: "ok", hidden: true },
                { id: "t5", text: "helm upgrade -i shop-web ./shop-web", tone: "cmd", hidden: true },
                { id: "t6", text: "Release \"shop-web\" does not exist. Installing it now.", tone: "out", hidden: true },
                { id: "t7", text: "STATUS: deployed   REVISION: 1", tone: "ok", hidden: true },
                { id: "t8", text: "kubectl get pods -n shop", tone: "cmd", hidden: true },
                { id: "t9", text: "shop-web-6c8d9f7b4-x2k1p   1/1   Running   (외 2개)", tone: "out", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① helm create로 Helm 차트 뼈대를 만듭니다" },
              { t: "type", target: "t1", text: "helm create shop-web" },
              { t: "reveal", target: "t2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② values.yaml에서 레플리카 수와 이미지를 바꿉니다" },
              { t: "dblclick", target: "c1" },
              { t: "type", target: "c2", text: "replicaCount: 3" },
              { t: "dblclick", target: "c4" },
              { t: "type", target: "c5", text: "repository: ghcr.io/acme/shop-web" },
              { t: "dblclick", target: "c6" },
              { t: "type", target: "c7", text: "tag: \"2.4.1\"" },
              { t: "caption", text: "③ lint로 문법을 검사합니다" },
              { t: "type", target: "t3", text: "helm lint ./shop-web" },
              { t: "reveal", target: "t4" },
              { t: "caption", text: "④ upgrade -i(--install) 한 명령으로 설치합니다" },
              { t: "type", target: "t5", text: "helm upgrade -i shop-web ./shop-web" },
              { t: "reveal", target: "t6" },
              { t: "reveal", target: "t7" },
              { t: "type", target: "t8", text: "kubectl get pods -n shop" },
              { t: "reveal", target: "t9" },
              { t: "move", target: "t9" },
              { t: "caption", text: "✅ 리비전 1 배포 완료 — 같은 명령이 다음 업그레이드에도 쓰입니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "gitops-with-argocd",
          title: "GitOps와 Argo CD: Git이 곧 클러스터 상태",
          minutes: 6,
          content: `\`kubectl apply\`를 사람이 노트북에서 실행하는 한, "지금 프로덕션에 뭐가 배포돼 있지?"에 아무도 확실히 답할 수 없습니다. GitOps는 그 답을 **Git 저장소**로 못박습니다.

## GitOps의 규칙 셋

- 클러스터의 **원하는 상태**는 전부 Git에 있다.
- 사람은 클러스터를 직접 만지지 않고 **Git에 PR**한다.
- 도구가 Git과 클러스터를 **끊임없이 비교**해 드리프트를 없앤다.

오케스트라 악보와 같습니다. 악보(Git)가 바뀌면 연주(클러스터)가 바뀌고, 몰래 음을 바꾸면(\`kubectl edit\`) 지휘자(Argo CD)가 되돌립니다.

## Argo CD의 핵심 오브젝트: Application

"이 저장소의 이 경로를, 이 클러스터의 이 네임스페이스에" 배포하라는 선언입니다.

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata: { name: shop-web, namespace: argocd }
spec:
  project: default
  source:
    repoURL: https://github.com/acme/k8s-manifests.git
    targetRevision: main
    path: apps/shop-web
  destination: { server: https://kubernetes.default.svc, namespace: shop }
  syncPolicy:
    automated: { prune: true, selfHeal: true }
    syncOptions: ["CreateNamespace=true"]
\`\`\`

\`automated\`는 Git이 바뀌면 자동 동기화, \`prune\`은 Git에서 지운 리소스를 클러스터에서도 삭제, \`selfHeal\`은 손으로 바꾼 것을 되돌립니다. 처음엔 **수동 Sync**로 diff를 익힌 뒤 켜세요.

## 설치와 두 가지 상태

\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml   # CRD가 커서 서버측 적용 필요
kubectl port-forward svc/argocd-server -n argocd 8080:443
argocd admin initial-password -n argocd   # 초기 admin 비밀번호
\`\`\`

- **Sync 상태** — \`Synced\` / \`OutOfSync\`(Git과 차이). 새 커밋 직후나 누가 손으로 고쳤을 때.
- **Health 상태** — \`Healthy\` / \`Progressing\` / \`Degraded\` / \`Suspended\` / \`Missing\` / \`Unknown\`. 하위 리소스 중 **가장 나쁜 것**이 Application의 헬스.

UI에서는 **+ New App**으로 만들고, OutOfSync일 때 **Sync** → **Synchronize**를 누르면 Healthy가 됩니다.

**여기서 막힌다면**
- \`repository not accessible\` — 비공개 저장소 자격 증명을 Settings > Repositories에 등록하세요.
- Sync 직후 다시 \`OutOfSync\` — HPA 등 다른 컨트롤러가 바꾸는 필드입니다. \`ignoreDifferences\`로 제외하세요.

> 💡 **핵심**: GitOps에서 배포는 \`kubectl\`이 아니라 **PR 머지**입니다. Argo CD는 Git과 클러스터의 차이를 보여 주고(OutOfSync), 없애 줍니다(Sync → Healthy).`,
          illustration: {
            type: "cycle",
            title: "GitOps 조정 루프",
            center: "Git = 원하는 상태",
            nodes: [
              { label: "PR 머지", sublabel: "매니페스트·values 변경", icon: "git-branch" },
              { label: "차이 감지", sublabel: "OutOfSync", icon: "eye" },
              { label: "동기화", sublabel: "Sync → Progressing", icon: "refresh" },
              { label: "정상 확인", sublabel: "Synced · Healthy", icon: "check" },
              { label: "드리프트 감시", sublabel: "수동 변경 → selfHeal", icon: "shield" },
            ],
            caption: "사람이 클러스터를 직접 바꿔도 루프가 Git 상태로 되돌리기 때문에 Git 이력이 곧 배포 이력이 됩니다.",
          },
          demo: {
            title: "Argo CD UI에서 OutOfSync → Sync → Healthy",
            app: {
              kind: "browser",
              url: "localhost:8080/applications/argocd/shop-web",
              blocks: [
                { id: "b-title", type: "heading", label: "shop-web" },
                { id: "b-src", type: "text", label: "acme/k8s-manifests · main · apps/shop-web → cluster: in-cluster / ns: shop" },
                { id: "b-out", type: "badge", label: "⟳ OutOfSync  (image: 2.4.0 → 2.4.1)" },
                { id: "b-healthy0", type: "badge", label: "♥ Healthy" },
                { id: "b-sync", type: "button", label: "SYNC" },
                { id: "b-panel", type: "card", label: "Synchronizing application manifests from main — Revision: HEAD · Prune ☐ · Dry Run ☐", hidden: true },
                { id: "b-synchronize", type: "button", label: "SYNCHRONIZE", hidden: true },
                { id: "b-syncing", type: "badge", label: "⟳ Syncing…", hidden: true },
                { id: "b-prog", type: "badge", label: "◔ Progressing", hidden: true },
                { id: "b-tree", type: "card", label: "Deployment shop-web  ·  ReplicaSet shop-web-7d9f6c8b5  ·  Pods 3/3 Running", hidden: true },
                { id: "b-synced", type: "badge", label: "✓ Synced to main (a1f9c2e)", hidden: true },
                { id: "b-healthy", type: "badge", label: "♥ Healthy", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 새 커밋이 머지되자 Application이 OutOfSync로 바뀌었습니다" },
              { t: "move", target: "b-out" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 상단 SYNC 버튼을 누르면 동기화 패널이 열립니다" },
              { t: "click", target: "b-sync" },
              { t: "reveal", target: "b-panel" },
              { t: "reveal", target: "b-synchronize" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 패널의 SYNCHRONIZE로 Git 상태를 적용합니다" },
              { t: "click", target: "b-synchronize" },
              { t: "hide", target: "b-panel" },
              { t: "hide", target: "b-synchronize" },
              { t: "hide", target: "b-out" },
              { t: "hide", target: "b-healthy0" },
              { t: "reveal", target: "b-syncing" },
              { t: "reveal", target: "b-prog" },
              { t: "wait", ms: 900 },
              { t: "caption", text: "④ 롤아웃이 끝나면 리소스 트리가 초록으로 바뀝니다" },
              { t: "reveal", target: "b-tree" },
              { t: "hide", target: "b-syncing" },
              { t: "hide", target: "b-prog" },
              { t: "reveal", target: "b-synced" },
              { t: "reveal", target: "b-healthy" },
              { t: "caption", text: "✅ Synced + Healthy — Git과 클러스터가 다시 일치합니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "progressive-delivery",
          title: "카나리 배포·블루그린 배포: Argo Rollouts로 점진적 전환",
          minutes: 6,
          content: `롤링 업데이트는 "새 파드가 뜨면 옛 파드를 지운다"까지만 합니다. **느리지만 죽지는 않는** 버그는 100% 사용자에게 전달됩니다. 점진적 배포는 **일부에게 먼저, 지표를 보고 결정**을 자동화합니다.

## Argo Rollouts: 디플로이먼트를 대체하는 CRD

\`kind: Rollout\`은 \`spec.template\`이 디플로이먼트와 같고, \`strategy\`만 다릅니다.

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata: { name: shop-web }
spec:
  selector: { matchLabels: { app: shop-web } }
  template:                      # Deployment와 동일한 파드 템플릿
    metadata: { labels: { app: shop-web } }
    spec: { containers: [{ name: web, image: ghcr.io/acme/shop-web:2.4.1 }] }
  strategy:
    canary:
      steps:
      - setWeight: 10
      - pause: { duration: 10m }
      - setWeight: 50
      - pause: {}                # 사람이 promote할 때까지 대기
\`\`\`

## 카나리 배포: 조금씩 늘리기

- \`setWeight\`는 새 버전이 받는 **트래픽 비율**. 트래픽 라우터(Ingress·Gateway API·서비스 메시)가 없으면 **파드 수 비율**로 근사.
- \`pause: { duration: 10m }\`은 시간 대기, \`pause: {}\`는 **사람이 승인**할 때까지.
- **AnalysisTemplate**을 끼우면 Prometheus·Datadog 지표(에러율·p99)가 기준 미달일 때 **자동 롤백**.

\`kubectl argo rollouts get rollout shop-web --watch\`로 진행을 보고, \`… promote shop-web\`으로 다음 단계, \`… abort shop-web\`으로 되돌립니다.

## 블루그린 배포: 한 번에 바꾸기

\`strategy.blueGreen\`은 새 버전(그린)을 **전체 크기로** 띄운 뒤 Service(서비스) 셀렉터를 한 번에 전환합니다. 비용은 두 배, 대신 전환·롤백이 순간적입니다.

- \`activeService\`(필수)가 실제 트래픽을 받고, \`previewService\`로 전환 전에 그린을 미리 테스트합니다.
- \`autoPromotionEnabled: false\`면 promote할 때까지 전환하지 않고, \`scaleDownDelaySeconds\`(기본 30)만큼 옛 버전을 남겨 둡니다.

신제품 시식(카나리)과 매장 리뉴얼 오픈(블루그린)의 차이 — 반응을 보며 늘리느냐, 다 지어 놓고 간판을 바꾸느냐.

무상태 웹·API에 지표가 있으면 **카나리 + 분석**, 두 버전 공존이 어렵거나(DB 스키마 변경) 즉시 복귀가 중요하면 **블루그린**입니다.

> 💡 **핵심**: 롤링 업데이트는 "뜨는가"만 봅니다. 점진적 배포는 **"좋은가"를 지표로 확인하며 트래픽을 옮기고, 나쁘면 스스로 되돌립니다.**`,
          illustration: {
            type: "compare",
            title: "카나리 배포 vs 블루그린 배포",
            columns: [
              {
                title: "카나리 배포",
                icon: "trending-up",
                tone: "primary",
                items: ["10% → 50% → 100% 단계별 전환", "AnalysisTemplate로 지표 기반 자동 롤백", "추가 비용 작음(파드 몇 개)", "두 버전이 한동안 공존"],
              },
              {
                title: "블루그린 배포",
                icon: "refresh",
                tone: "accent",
                items: ["그린을 전체 크기로 미리 띄움", "activeService 셀렉터 한 번에 전환", "비용 2배, 전환·롤백은 순간", "previewService로 사전 테스트"],
              },
            ],
            caption: "지표로 판단할 수 있으면 카나리, 두 버전 공존이 어렵거나 즉시 복귀가 생명이면 블루그린입니다.",
          },
        },
        {
          slug: "upgrades-cost-and-next",
          title: "버전 정책(N-2)·안전한 업그레이드·비용 최적화 + 다음 단계",
          minutes: 6,
          content: `클러스터는 만들어 두면 끝이 아니라 **매년 두세 번 이사**해야 하는 집입니다. 오래된 버전은 보안 패치를 받지 못합니다.

## 버전 정책(N-2)과 안전한 업그레이드 순서

- 2026년 9월 기준 최신은 **1.37**. 공식 지원은 **최근 3개 마이너(N-2)**, 각 마이너는 약 **14개월**(12개월 정규 패치 + 2개월 유지보수) 뒤 EOL.
- 관리형 서비스(EKS·GKE·AKS)는 지원 정책이 따로 있습니다.

1. **제거되는 API 확인** — 릴리스 노트를 보고 해당 매니페스트를 먼저 고칩니다.
2. **스테이징부터** 같은 경로로 올립니다.
3. **컨트롤 플레인 먼저** — kube-apiserver → 나머지. **마이너 한 단계씩만**(1.35 → 1.36 → 1.37), 건너뛰기 금지.
4. **노드는 그다음** — kubelet은 최대 3마이너 낮아도 되니 \`kubectl drain --ignore-daemonsets\`로 하나씩 교체합니다. PDB가 있어야 무중단입니다(5강).
5. 애드온(CNI·metrics-server·CSI)도 호환 버전으로 올립니다.

## 비용 최적화: 낭비는 requests에서 시작된다

- **requests 적정화** — 낭비의 대부분은 실사용의 몇 배로 잡힌 requests입니다. VPA 추천 모드로 실측값을 얻어 조정하세요(4강).
- **노드 통합·스팟** — Karpenter consolidation이나 Cluster Autoscaler 축소로 빈 노드를 없애고, 중단돼도 되는 배치·큐 소비자는 **스팟 노드**에 격리합니다.
- **비용 가시화** — OpenCost(CNCF 인큐베이팅, 벤더 중립)나 상용 Kubecost로 네임스페이스·디플로이먼트 단위 비용을 봅니다.

## 다음 단계

남은 것은 **관측**입니다 — 카나리 분석 지표, SLO, 인시던트 대응은 **"Datadog 심화: APM·SLO·인시던트 운영"**에서 이어집니다. Datadog이 처음이라면 **"Datadog 입문: 서비스 모니터링 시작하기"**부터 들으세요.

> 💡 **핵심**: 운영은 세 개의 달력 — **분기별 업그레이드**, **월별 requests·비용 점검**, **매 배포의 점진적 전환**. 리듬이 없으면 EOL과 청구서를 동시에 만납니다.`,
          illustration: {
            type: "chat",
            title: "업그레이드 계획 짜기",
            messages: [
              { role: "user", text: "프로덕션이 1.34인데 지원이 곧 끝난대요. 1.37로 한 번에 올려도 되나요?" },
              { role: "ai", text: "kube-apiserver는 마이너를 건너뛸 수 없어요. 1.34 → 1.35 → 1.36 → 1.37, 세 번에 나눠야 합니다. 각 단계마다 제거된 API를 먼저 점검하세요." },
              { role: "user", text: "순서는요?" },
              { role: "ai", text: "스테이징 먼저. 그다음 컨트롤 플레인 → 노드 그룹을 하나씩 drain하며 교체. PDB가 없는 워크로드는 이때 끊깁니다 — 업그레이드 전에 PDB부터 채우세요." },
              { role: "system", text: "이번 주기 체크: 제거 API 0건 · PDB 12/12 · 스테이징 1.35 완료" },
            ],
            caption: "'한 번에'는 없습니다 — 마이너 한 단계, 컨트롤 플레인 먼저, 노드는 PDB를 믿고 하나씩.",
          },
        },
      ],
    },
  ],
};
