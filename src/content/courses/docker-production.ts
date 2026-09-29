import type { Course } from "../types";

/**
 * Docker 실전 (인프라 & DevOps 2/6단계) — docker-basics를 마친 학습자를 위한 운영용 이미지·컨테이너 강의.
 *
 * 사실 검증 메모 (2026-09 기준 웹 검색):
 * - 멀티스테이지 문법: `FROM <image> AS <name>`, `COPY --from=<name>`, `docker build --target <name>` (docs.docker.com/build/building/multi-stage)
 * - 이미지 크기 근거: golang 공식 이미지 800MB+ → scratch/Distroless 최종 10~20MB 수준, node 전체(full) 1GB 이상 → slim 수백 MB·alpine 200MB 안팎
 *   (hub.docker.com/_/node, snyk.io, dev.to, oneuptime.com 다수 사례) → 본문은 "예: 약 1GB → 200MB 안팎", "800MB → 수십 MB"로 완곡 표기
 * - Node 공식 이미지 LTS 태그 = 24, 변형 <ver>/-slim/-alpine, Debian bookworm·trixie 계열, 내장 node 사용자 UID 1000 (hub.docker.com/_/node, github.com/nodejs/docker-node)
 * - Distroless 이미지 이름: gcr.io/distroless/static-debian13, base-debian13, cc-debian13, nodejs24-debian13, python3-debian13, java21-debian13 등,
 *   태그 :nonroot/:debug/:debug-nonroot, static 변형 약 2MiB (github.com/GoogleContainerTools/distroless)
 * - Docker Hardened Images: 레지스트리 dhi.io, `docker login dhi.io`(Docker 계정, 무료), `dhi.io/node:24`(런타임)·`dhi.io/node:24-dev`(빌드용) 변형,
 *   2025-12 무료·Apache 2.0 공개 1,000개+, 비루트 기본, SBOM·SLSA Build L3 (docs.docker.com/dhi, docker.com 보도자료, devclass.com)
 * - BuildKit 캐시 마운트: `RUN --mount=type=cache,target=<path>[,id=][,sharing=shared|private|locked]`, npm은 /root/.npm, Go는 /go/pkg/mod·/root/.cache/go-build,
 *   apt는 sharing=locked (docs.docker.com/reference/dockerfile, docs.docker.com/build/cache/optimize)
 * - 빌드 시크릿: `docker build --secret id=X,src=파일` 또는 `--secret id=ENV`, Dockerfile `RUN --mount=type=secret,id=X[,target=][,env=]`, 기본 경로 /run/secrets/<id>;
 *   ARG/ENV로 비밀값 전달 비권장(docker history에 노출) (docs.docker.com/build/building/secrets, reference/dockerfile)
 * - 멀티 아키텍처: `docker buildx build --platform linux/amd64,linux/arm64 --push`, docker-container 드라이버 빌더(`docker buildx create --driver docker-container --use`),
 *   --load는 매니페스트 리스트 미지원(containerd 이미지 스토어 필요, Engine 29+/Desktop은 기본 포함), QEMU `docker run --privileged --rm tonistiigi/binfmt --install all`
 *   (docs.docker.com/build/building/multi-platform, reference/cli/docker/buildx/build)
 * - 네트워크: 드라이버 bridge/host/none/overlay/ipvlan/macvlan, 사용자 정의 네트워크에서만 컨테이너 이름 DNS(내장 DNS 서버), host 모드에서 -p 무시 경고,
 *   Docker Desktop 4.34+에서 host 네트워크는 Settings > Resources > Network에서 켜야 함 (docs.docker.com/engine/network)
 * - Docker 볼륨: "Volumes are the preferred mechanism for persisting data", --mount가 -v보다 명시적, 읽기 전용 `:ro`/`readonly` (docs.docker.com/engine/storage/volumes)
 * - Compose: healthcheck(test/interval/timeout/retries/start_period/start_interval), depends_on 롱 문법 condition service_started|service_healthy|service_completed_successfully,
 *   env_file 문자열·리스트·required, profiles(프로필 없는 서비스는 항상 기동), deploy.resources.limits(cpus/memory/pids), logging.options max-size/max-file,
 *   secrets → /run/secrets/<name>, `docker compose up -d --wait`(running|healthy까지 대기) (docs.docker.com/reference/compose-file, reference/cli/docker/compose/up)
 * - .env 파일은 compose.yaml 보간 전용이고 컨테이너에 자동 주입되지 않음; env_file/environment만 컨테이너에 전달 (docs.docker.com/compose/how-tos/environment-variables)
 * - Dockerfile HEALTHCHECK 기본값 interval 30s / timeout 30s / start-period 0s / start-interval 5s(Engine 25+) / retries 3 (docs.docker.com/reference/dockerfile)
 * - 리소스 제한: `--memory`(최소 6m), `--memory-swap`, `--cpus=1.5`, `--cpuset-cpus`, 한도 초과 시 커널 OOM 킬 (docs.docker.com/engine/containers/resource_constraints)
 * - 로그: json-file이 기본, max-size 기본 -1(무제한), max-file 기본 1(max-size와 함께일 때만 유효), daemon.json 값은 문자열로;
 *   local 드라이버는 기본 20m×5=100MB 로테이션 (docs.docker.com/engine/logging/drivers/json-file, drivers/local)
 * - Docker Scout: `docker scout quickview`(Target/Base image/Updated base image 행, 0C 0H 2M 5L 형식), `docker scout cves --only-severity --only-fixed --exit-code`,
 *   출력 "✓ Image stored for indexing / ✓ Indexed N packages / ✗ Detected N vulnerable packages" (docs.docker.com/reference/cli/docker/scout, scout/quickstart)
 * - Trivy: `trivy image [--severity HIGH,CRITICAL] [--ignore-unfixed] [--exit-code 1] 이미지`, 표 열 Library/Vulnerability/Severity/Status/Installed Version/Fixed Version/Title,
 *   요약 "Total: N (UNKNOWN: 0, LOW: .., MEDIUM: .., HIGH: .., CRITICAL: ..)" (trivy.dev)
 * - GitHub Actions 최신 메이저(2026-09-30 GitHub Releases API 재확인): actions/checkout@v7(v7.0.1), docker/setup-buildx-action@v4(v4.4.1), docker/login-action@v4(v4.6.0),
 *   docker/metadata-action@v6(v6.2.0), docker/build-push-action@v7(v7.4.0);
 *   GHCR 로그인 registry ghcr.io + github.actor + secrets.GITHUB_TOKEN, permissions packages: write, 이미지 이름 ghcr.io/OWNER/IMAGE 소문자,
 *   캐시 type=gha (docs.github.com/packages, github.com/docker/*-action releases, docs.docker.com/build/ci/github-actions)
 * - Docker Engine 29 계열, BuildKit이 기본 빌더(23.0+), compose 파일 version 키는 obsolete — 지침 5절 값 준수
 * - 검수 추가 확인(2026-09-30): golang:1.26·1.27 태그 존재(hub.docker.com/_/golang); Engine 20.10+는 컨테이너 안 ip_unprivileged_port_start=0으로 비루트도 1024 미만 포트 바인딩 가능;
 *   Alpine musl 오류 문구 "Error loading shared library ld-linux-x86-64.so.2"; Docker Scout CLI는 Desktop 내장·리눅스는 install.sh(docs.docker.com/scout/install);
 *   deploy.resources.limits는 Swarm 없이 docker compose up에서 적용; DHI 실행 변형 nonroot UID 65532, 형식 dhi.io/<image>:<tag>·-dev 변형(docs.docker.com/dhi/how-to/use)
 */
export const dockerProduction: Course = {
  slug: "docker-production",
  title: "Docker 실전: 작고 안전한 이미지와 운영",
  subtitle: "1GB 이미지를 수십 MB로, root 컨테이너를 비루트로 — 운영에서 살아남는 Docker",
  description:
    "docker run이 되는 것과 서비스가 몇 달째 안 죽고 도는 것은 전혀 다른 문제입니다. 이 강의는 Docker 입문을 마친 분을 위해 '운영용 Docker'의 기준을 하나씩 세웁니다. 멀티스테이지 빌드와 베이스 이미지 선택으로 이미지를 작게 만들고, BuildKit 캐시와 멀티 아키텍처 빌드로 빠르게 만들며, 사용자 정의 네트워크·Docker 볼륨·Compose 헬스체크로 여러 컨테이너를 안정적으로 묶습니다. 마지막으로 비루트 실행, 시크릿 분리, 취약점 스캔, 리소스 제한, GitHub Actions 자동 빌드까지 — 실무 체크리스트 순서 그대로 따라갑니다.",
  category: "devops",
  level: "intermediate",
  tags: ["Docker", "멀티스테이지 빌드", "컨테이너 보안", "Docker Compose", "GitHub Actions", "이미지 최적화"],
  gradient: ["#0284c7", "#1e3a8a"],
  icon: "package",
  outcomes: [
    "멀티스테이지 빌드와 알맞은 베이스 이미지로 이미지 크기를 크게 줄일 수 있다",
    "레이어 순서와 BuildKit 캐시 마운트로 빌드 시간을 단축하고 amd64/arm64 이미지를 함께 만들 수 있다",
    "사용자 정의 네트워크·Docker 볼륨·Compose 헬스체크로 앱+DB를 안정적으로 구성할 수 있다",
    "비루트 실행, 시크릿 분리, 취약점 스캔으로 이미지의 보안 기준을 지킬 수 있다",
    "리소스 제한과 로그 로테이션을 설정하고 GitHub Actions로 빌드·푸시를 자동화할 수 있다",
  ],
  modules: [
    {
      slug: "image-optimization",
      title: "이미지 최적화",
      description: "작고 빠르게 — 멀티스테이지, 베이스 이미지, 레이어 캐시, BuildKit",
      lessons: [
        {
          slug: "why-production-docker",
          title: "개발용 Docker와 운영용 Docker는 다르다",
          minutes: 4,
          content: `내 노트북에서 \`docker run\`이 잘 되는 것과, 그 컨테이너가 서버에서 몇 달째 죽지 않고 도는 것은 **전혀 다른 문제**입니다. 이 강의는 그 간극을 메웁니다.

## 목표가 다르면 만드는 법도 다르다

- **개발용**: 빨리 띄우고, 코드를 고치면 바로 반영되면 충분합니다. 바인드 마운트, \`latest\` 이미지 태그, root 실행이 흔합니다.
- **운영용**: 수백 번 내려받고, 공격을 견디고, 새벽에도 혼자 복구돼야 합니다. 그래서 **작고, 안전하고, 예측 가능해야** 합니다.

출장 짐 싸기에 비유하면, 개발용은 이사 트럭(집에 있던 걸 다 싣기)이고 운영용은 기내용 캐리어(필요한 것만, 검색대 통과 가능하게)입니다.

## 운영용 이미지의 4가지 기준

1. **크기** — 작을수록 전송·저장 비용이 줄고 배포가 빨라집니다.
2. **보안** — 셸·컴파일러·root 권한처럼 공격자가 쓸 도구가 없어야 합니다.
3. **재현성** — 같은 Dockerfile이면 언제 빌드해도 같은 결과가 나와야 합니다.
4. **운영성** — 헬스체크, 로그, 리소스 제한이 있어야 문제를 스스로 드러냅니다.

## 이 강의 로드맵

- **모듈 1 이미지 최적화** — 멀티스테이지 빌드, 베이스 이미지 선택, 레이어 캐시, BuildKit과 멀티 아키텍처
- **모듈 2 네트워크와 스토리지** — 사용자 정의 네트워크, Docker 볼륨 vs 바인드 마운트, Compose 실전
- **모듈 3 보안과 전달** — 비루트·시크릿, 취약점 스캔, 리소스 제한·로그, GitHub Actions 자동 빌드

선수 강의는 "Docker 입문: 컨테이너로 어디서나 똑같이 실행하기"입니다. \`docker build\`와 \`docker compose up\`을 한 번이라도 해 봤다면 충분합니다.

> 💡 **핵심**: 운영용 Docker의 기준은 **작게·안전하게·예측 가능하게**. 이 강의의 모든 레슨은 이 세 단어 중 하나를 위한 것입니다.`,
          illustration: {
            type: "compare",
            title: "개발용 컨테이너 vs 운영용 컨테이너",
            columns: [
              {
                title: "개발용 (빨리 띄우기)",
                icon: "terminal",
                tone: "muted",
                items: [
                  "바인드 마운트로 코드 즉시 반영",
                  "latest 이미지 태그, 전체(full) 베이스 이미지",
                  "root로 실행, 시크릿은 .env에",
                  "리소스 제한·헬스체크 없음",
                ],
              },
              {
                title: "운영용 (오래 살아남기)",
                icon: "shield",
                tone: "primary",
                items: [
                  "멀티스테이지 빌드로 결과물만 포장",
                  "고정 이미지 태그, slim/Distroless",
                  "비루트 실행, 시크릿은 마운트로 주입",
                  "--memory/--cpus, 헬스체크, 로그 로테이션",
                ],
              },
            ],
            caption: "왼쪽이 틀린 것이 아닙니다 — 목적이 다를 뿐이고, 이 강의는 오른쪽으로 옮겨 가는 법을 다룹니다.",
          },
        },
        {
          slug: "multi-stage-builds",
          title: "멀티스테이지 빌드: 1GB 이미지를 100MB로",
          minutes: 7,
          content: `빌드 도구(컴파일러, 개발용 패키지)와 실행에 필요한 것(결과물, 런타임)은 다릅니다. 그런데 Dockerfile 하나로 빌드하면 **둘 다 최종 이미지에 남습니다**. 멀티스테이지 빌드는 단계를 나눠 이 문제를 풉니다.

## 두 개의 FROM, 하나의 결과

- 첫 번째 \`FROM ... AS build\`는 **빌드 단계**입니다. 무거워도 괜찮습니다.
- 두 번째 \`FROM\`이 **실행 단계**이자 최종 이미지입니다. \`COPY --from=build\`로 **결과물만** 가져옵니다.
- 앞 단계의 컴파일러·소스·개발용 패키지는 최종 이미지에 **한 바이트도 남지 않습니다**.

도시락 공장에 비유하면, 조리 시설(빌드 단계)은 공장에 두고 손님에게는 도시락(실행 단계)만 배달하는 것입니다.

## Node.js와 Go 예시

\`\`\`dockerfile
FROM node:24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
CMD ["node", "dist/server.js"]
\`\`\`

단일 스테이지 \`node:24\` 이미지는 1GB를 넘기 쉽지만, 나누면 **200MB 안팎**까지 줄어듭니다(의존성에 따라 다름). Go처럼 정적 바이너리라면 더 극적입니다.

\`\`\`dockerfile
FROM golang:1.26 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /bin/app .

FROM gcr.io/distroless/static-debian13:nonroot
COPY --from=build /bin/app /app
ENTRYPOINT ["/app"]
\`\`\`

\`golang\` 이미지는 800MB가 넘지만 최종 이미지는 **바이너리 + 약 2MB**로 보통 수십 MB 이하입니다. 특정 단계까지만 빌드하려면 \`docker build --target build .\`.

## 여기서 막힌다면

- \`failed to compute cache key: "/app/dist": not found\` → 빌드 단계의 결과물 경로와 \`COPY --from\`의 원본 경로가 다릅니다. 빌드 단계에 \`RUN ls /app\`을 잠시 넣어 확인하세요.
- Alpine 최종 이미지에서 \`Error loading shared library ld-linux-x86-64.so.2\`나 \`... not found\` 오류 → glibc용 네이티브 모듈을 musl 기반 Alpine에서 실행한 것입니다. \`node:24-slim\`으로 바꿔 보세요(다음 레슨).

> 💡 **핵심**: 멀티스테이지 빌드의 규칙은 하나 — **빌드는 무겁게, 실행은 결과물만.** \`COPY --from=build\` 한 줄이 이미지 크기를 결정합니다.`,
          illustration: {
            type: "flow",
            title: "멀티스테이지 빌드의 데이터 흐름",
            nodes: [
              {
                label: "빌드 단계 (FROM node:24 AS build)",
                sublabel: "컴파일러·devDependencies·소스 전부 포함, 1GB+",
                icon: "wrench",
                tone: "muted",
              },
              {
                label: "COPY --from=build",
                sublabel: "결과물(dist/)만 골라 복사",
                icon: "filter",
                tone: "accent",
                edgeLabel: "필요한 파일만 통과",
              },
              {
                label: "실행 단계 (FROM node:24-alpine)",
                sublabel: "런타임 + 결과물 + 운영 의존성",
                icon: "package",
                tone: "primary",
              },
              {
                label: "최종 이미지",
                sublabel: "200MB 안팎 — 빌드 도구 흔적 없음",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "빌드 단계의 무게는 최종 이미지에 전혀 전해지지 않습니다 — 복사한 파일만 남습니다.",
          },
          demo: {
            title: "단일 스테이지를 멀티스테이지로 바꾸고 크기 비교하기",
            app: {
              kind: "code-editor",
              windowTitle: "Dockerfile — api",
              files: [
                { id: "f-docker", name: "Dockerfile", active: true },
                { id: "f-single", name: "Dockerfile.1" },
                { id: "f-pkg", name: "package.json" },
              ],
              code: [
                { id: "c1", text: "# 1단계: 빌드 (컴파일러·devDependencies 포함)", tone: "comment" },
                { id: "c2", text: "FROM node:24 AS build" },
                { id: "c3", text: "WORKDIR /app" },
                { id: "c4", text: "COPY package*.json ./" },
                { id: "c5", text: "RUN npm ci" },
                { id: "c6", text: "COPY . ." },
                { id: "c7", text: "RUN npm run build" },
                { id: "c8", text: "# 2단계: 실행 (결과물만 복사)", tone: "comment", hidden: true },
                { id: "c9", text: "FROM node:24-alpine", tone: "add", hidden: true },
                { id: "c10", text: "WORKDIR /app", tone: "add", hidden: true },
                { id: "c11", text: "COPY package*.json ./", tone: "add", hidden: true },
                { id: "c12", text: "RUN npm ci --omit=dev", tone: "add", hidden: true },
                { id: "c13", text: "COPY --from=build /app/dist ./dist", tone: "add", hidden: true },
                { id: "c14", text: "USER node", tone: "add", hidden: true },
                { id: "c15", text: 'CMD ["node", "dist/server.js"]', tone: "add", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "docker build -f Dockerfile.1 -t api:v1 .", tone: "cmd", hidden: true },
                { id: "t2", text: "[+] Building 96.2s (11/11) FINISHED", tone: "out", hidden: true },
                { id: "t3", text: "docker build -t api:v2 .", tone: "cmd", hidden: true },
                { id: "t4", text: "[+] Building 41.7s (17/17) FINISHED", tone: "out", hidden: true },
                { id: "t5", text: "docker image ls api", tone: "cmd", hidden: true },
                { id: "t6", text: "REPOSITORY   TAG   IMAGE ID       SIZE", tone: "out", hidden: true },
                { id: "t7", text: "api          v1    3f1c9a7b2e10   1.12GB", tone: "err", hidden: true },
                { id: "t8", text: "api          v2    9ab27c4d5f31   203MB", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 비교용으로 단일 스테이지(Dockerfile.1) 이미지를 먼저 빌드합니다" },
              { t: "type", target: "t1", text: "docker build -f Dockerfile.1 -t api:v1 ." },
              { t: "reveal", target: "t2" },
              { t: "caption", text: "② 빌드 단계는 그대로 두고, 그 아래에 실행 단계를 추가합니다" },
              { t: "move", target: "c7" },
              { t: "type", target: "c8", text: "# 2단계: 실행 (결과물만 복사)" },
              { t: "type", target: "c9", text: "FROM node:24-alpine" },
              { t: "type", target: "c10", text: "WORKDIR /app" },
              { t: "type", target: "c11", text: "COPY package*.json ./" },
              { t: "type", target: "c12", text: "RUN npm ci --omit=dev" },
              { t: "caption", text: "③ COPY --from=build로 빌드 결과물만 가져옵니다" },
              { t: "type", target: "c13", text: "COPY --from=build /app/dist ./dist" },
              { t: "caption", text: "④ 비루트 사용자로 전환하고 실행 명령을 적습니다" },
              { t: "type", target: "c14", text: "USER node" },
              { t: "type", target: "c15", text: 'CMD ["node", "dist/server.js"]' },
              { t: "caption", text: "⑤ 멀티스테이지 이미지를 빌드합니다" },
              { t: "type", target: "t3", text: "docker build -t api:v2 ." },
              { t: "reveal", target: "t4" },
              { t: "caption", text: "⑥ 두 이미지의 크기를 나란히 비교합니다" },
              { t: "type", target: "t5", text: "docker image ls api" },
              { t: "reveal", target: "t6" },
              { t: "reveal", target: "t7" },
              { t: "reveal", target: "t8" },
              { t: "caption", text: "✅ 1.12GB → 203MB — 빌드 도구가 최종 이미지에서 사라졌습니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "base-image-choice",
          title: "베이스 이미지 선택: Debian slim·Alpine·Distroless·Docker Hardened Images",
          minutes: 6,
          content: `\`FROM\` 한 줄이 이미지 크기의 절반과 취약점 대부분을 결정합니다. 선택지는 네 갈래입니다.

## 네 가지 선택지

- **Debian 전체(full)** — \`node:24\`처럼 접미사 없는 이미지. 컴파일러·git·curl까지 들어 1GB에 가깝습니다. **빌드 단계에만** 쓰세요.
- **Debian slim** — \`node:24-slim\`. 런타임 최소 패키지만 남긴 Debian. glibc라 호환 문제가 거의 없어 **운영의 기본 선택**입니다.
- **Alpine** — \`node:24-alpine\`. 약 5MB로 가장 작지만, musl libc 때문에 네이티브 모듈 호환 문제가 납니다.
- **Distroless** — \`gcr.io/distroless/nodejs24-debian13\`, \`static-debian13\`(정적용, 약 2MB). 셸·패키지 관리자가 없어 공격 표면이 가장 작지만 \`docker exec\` 디버깅이 안 됩니다(\`:debug\` 이미지 태그는 셸 포함).

숙소로 치면 풀옵션 호텔(full), 비즈니스호텔(slim), 캡슐호텔(Alpine), 금고(Distroless)입니다.

## Docker Hardened Images: 새 기본값

2025년 12월부터 **무료·Apache 2.0**으로 1,000개 이상 공개됐습니다. 비루트가 기본이고 SBOM과 SLSA Build L3 출처 증명이 붙어 있습니다.

\`\`\`bash
docker login dhi.io                 # Docker 계정으로 로그인 (무료)
docker pull dhi.io/node:24-dev      # 빌드용: 셸·npm 포함
docker pull dhi.io/node:24          # 실행용: 최소 구성, 비루트
\`\`\`

Distroless처럼 \`-dev\` 변형으로 빌드하고, 실행용 변형(셸 없음, 비루트 UID 65532)에 \`COPY --from\`으로 결과물만 옮깁니다.

## 고르는 순서

- 정적 바이너리(Go, Rust) → \`distroless/static\` 또는 Docker Hardened Images
- Node·Python·Java → **slim** 또는 Docker Hardened Images. Alpine은 네이티브 의존성이 없을 때만.

> 💡 **핵심**: 운영 기본값은 **slim 또는 Docker Hardened Images**. Alpine은 "작다"는 이유만으로 고르지 말고, Distroless는 디버깅 방법을 정한 뒤 고르세요.`,
          illustration: {
            type: "grid",
            title: "베이스 이미지 4종 비교",
            items: [
              {
                label: "Debian 전체(full)",
                sublabel: "node:24 · 1GB 안팎 · 빌드 단계 전용",
                icon: "boxes",
                tone: "muted",
              },
              {
                label: "Debian slim",
                sublabel: "node:24-slim · 수백 MB · 운영 기본값",
                icon: "package",
                tone: "primary",
              },
              {
                label: "Alpine",
                sublabel: "node:24-alpine · 가장 작음 · musl 호환 주의",
                icon: "zap",
                tone: "warning",
              },
              {
                label: "Distroless",
                sublabel: "gcr.io/distroless/* · 셸 없음 · 공격 표면 최소",
                icon: "lock",
                tone: "success",
              },
              {
                label: "Docker Hardened Images",
                sublabel: "dhi.io/* · 비루트 기본 · SBOM·SLSA 포함",
                icon: "shield",
                tone: "success",
              },
              {
                label: "공통 규칙",
                sublabel: "latest 금지 · 메이저.마이너 이미지 태그 고정",
                icon: "check",
                tone: "accent",
              },
            ],
            caption: "아래로 갈수록 작고 안전하지만 디버깅이 어려워집니다 — 팀의 운영 역량에 맞춰 고르세요.",
          },
        },
        {
          slug: "layer-caching-strategy",
          title: "레이어 캐시 전략: 의존성 먼저, 소스는 나중에",
          minutes: 5,
          content: `코드 한 줄 고쳤는데 \`npm install\`이 다시 3분 도는 경험, 있으시죠. Dockerfile의 **줄 순서**만 바꿔도 대부분 해결됩니다.

## 캐시가 깨지는 규칙

- Dockerfile의 명령 하나가 이미지 레이어 하나를 만들고, Docker는 위에서부터 **바뀌지 않은 레이어는 재사용**합니다.
- 그런데 어떤 레이어가 바뀌면 **그 아래의 모든 레이어는 무조건 다시 빌드**됩니다.
- \`COPY . .\`은 파일 하나만 달라져도 바뀐 것으로 칩니다. 이 줄이 위에 있으면 그 아래 \`RUN npm ci\`가 매번 다시 돕니다.

케이크 층에 비유하면, 3층 케이크의 1층을 바꾸려면 2·3층도 다시 올려야 합니다. 그러니 **자주 바뀌는 층을 맨 위에** 두어야 합니다.

## 잘 바뀌지 않는 것부터 위에

\`\`\`dockerfile
FROM node:24-slim
WORKDIR /app
# 1) 의존성 명세만 먼저 복사 → 이 파일이 안 바뀌면 아래 RUN은 캐시
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
# 2) 소스는 마지막에 → 소스가 바뀌어도 위 레이어는 그대로
COPY . .
CMD ["node", "server.js"]
\`\`\`

Python이면 \`requirements.txt\`, Go면 \`go.mod\`·\`go.sum\`을 먼저 복사하고 \`go mod download\`를 하는 식으로 같은 원리를 적용합니다.

## 함께 지키면 좋은 세 가지

- **\`.dockerignore\`** — \`node_modules\`, \`.git\`, \`dist\`, \`.env\`를 제외하세요. 빌드 컨텍스트가 작아지고, 캐시가 불필요하게 깨지는 일도 줄어듭니다.
- **\`apt-get update\`와 \`install\`은 한 \`RUN\`에** — 따로 쓰면 \`update\`만 캐시돼 오래된 패키지 목록으로 설치하는 사고가 납니다. \`--no-install-recommends\`도 함께.
- **\`npm ci\`** — \`npm install\` 대신 lock 파일 그대로 설치해 재현성을 지킵니다.

> 💡 **핵심**: 레이어 캐시 전략은 한 문장입니다 — **"자주 바뀌는 것일수록 Dockerfile의 아래쪽에."**`,
          illustration: {
            type: "stack",
            title: "레이어 순서와 캐시 재사용 (위 = 자주 바뀜)",
            layers: [
              {
                label: "COPY . . → 소스 코드",
                sublabel: "매 커밋마다 바뀜 · 여기서만 다시 빌드",
                icon: "code",
                tone: "warning",
              },
              {
                label: "RUN npm ci --omit=dev",
                sublabel: "lock 파일이 그대로면 캐시 재사용",
                icon: "download",
                tone: "accent",
              },
              {
                label: "COPY package.json package-lock.json",
                sublabel: "의존성 바뀔 때만 변경",
                icon: "file-text",
                tone: "accent",
              },
              {
                label: "FROM node:24-slim + WORKDIR",
                sublabel: "거의 안 바뀜 · 항상 캐시",
                icon: "layers",
                tone: "muted",
              },
            ],
            caption: "바뀐 층 아래는 전부 다시 굽습니다 — 그래서 소스는 맨 위, 베이스 이미지는 맨 아래입니다.",
          },
        },
        {
          slug: "buildkit-and-buildx",
          title: "BuildKit과 buildx: 캐시 마운트와 멀티 아키텍처(amd64/arm64)",
          minutes: 6,
          content: `레이어 순서를 잘 잡아도 의존성이 바뀌면 다운로드는 처음부터입니다. M 시리즈 맥에서 만든 이미지가 amd64 서버에서 안 도는 문제도 있죠. 둘 다 BuildKit이 풉니다.

## 캐시 마운트: 패키지 캐시 유지

\`RUN --mount=type=cache\`는 빌드 중에만 붙는 캐시 폴더입니다. 레이어에는 남지 않고 다음 빌드에서 **같은 폴더가 다시 붙습니다**.

\`\`\`dockerfile
# syntax=docker/dockerfile:1
FROM node:24-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev
COPY . .
\`\`\`

- npm은 \`/root/.npm\`, Go는 \`/go/pkg/mod\`·\`/root/.cache/go-build\`. apt처럼 동시 접근에 약한 도구는 \`sharing=locked\`를 붙입니다.
- 공사장 공구함과 같습니다. 공구(패키지)는 건물(이미지)에 넣지 않고 공구함에 두었다가 다음 공사에 다시 씁니다.

## buildx: 한 번에 amd64 + arm64

멀티 아키텍처 이미지는 CPU 종류별 이미지를 이미지 태그 하나로 묶은 매니페스트 리스트입니다.

\`\`\`bash
docker buildx create --name multi --driver docker-container --use
docker buildx build --platform linux/amd64,linux/arm64 \\
  -t ghcr.io/acme/api:1.2.0 --push .
\`\`\`

- 결과는 **\`--push\`**로 바로 올리는 것이 표준입니다. \`--load\`는 containerd 이미지 스토어(Engine 29 계열·Docker Desktop 기본값)에서만 매니페스트 리스트를 받습니다.
- 다른 아키텍처는 QEMU 에뮬레이션이라 느립니다. 리눅스 서버는 \`docker run --privileged --rm tonistiigi/binfmt --install all\`로 먼저 등록하세요(Docker Desktop은 내장).

## 여기서 막힌다면

- \`docker exporter does not currently support exporting manifest lists\` → 기존(classic) 이미지 스토어에서 \`--load\`로 받은 것입니다. \`--push\`를 쓰거나 \`--platform linux/arm64 --load\`처럼 하나만 지정하세요.
- \`exec format error\` → CPU와 다른 아키텍처 이미지입니다. \`docker image inspect --format '{{.Architecture}}' 이미지\`로 확인하세요.

> 💡 **핵심**: 캐시 마운트는 "다운로드를 다시 안 하게", buildx \`--platform\`은 "어느 CPU에서든 돌게". 둘 다 BuildKit 기본 기능입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "buildx — 멀티 아키텍처 빌드",
            lines: [
              { text: "docker buildx create --name multi --driver docker-container --use", tone: "cmd" },
              { text: "multi", tone: "out" },
              { text: "docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/acme/api:1.2.0 --push .", tone: "cmd" },
              { text: "[+] Building 84.3s (28/28) FINISHED", tone: "out" },
              { text: " => [linux/amd64 build 4/6] RUN --mount=type=cache,target=/root/.npm npm ci", tone: "dim" },
              { text: " => [linux/arm64 build 4/6] RUN --mount=type=cache,target=/root/.npm npm ci", tone: "dim" },
              { text: " => CACHED (npm 캐시 마운트 재사용)", tone: "ok" },
              { text: " => exporting manifest list sha256:7d2f0c…", tone: "out" },
              { text: " => pushing manifest for ghcr.io/acme/api:1.2.0", tone: "ok" },
              { text: "# amd64·arm64 두 이미지가 이미지 태그 하나로 묶여 올라갔습니다", tone: "comment" },
            ],
            caption: "두 플랫폼이 같은 npm 캐시 마운트를 재사용하고, 결과는 매니페스트 리스트 하나로 푸시됩니다.",
          },
        },
      ],
    },
    {
      slug: "network-and-storage",
      title: "네트워크와 스토리지",
      description: "컨테이너끼리 이름으로 통신하고, 데이터는 안전하게 남기기",
      lessons: [
        {
          slug: "docker-networks",
          title: "네트워크 이해: bridge·host·사용자 정의 네트워크와 컨테이너 이름 DNS",
          minutes: 5,
          content: `앱 컨테이너가 DB 컨테이너에 접속하려면 주소가 필요합니다. IP는 컨테이너를 다시 만들 때마다 바뀌니 **이름으로 불러야** 합니다. 조건이 딱 하나 있습니다.

## 드라이버는 둘만 기억

- **bridge(기본)** — 컨테이너마다 가상 네트워크 카드를 주고 호스트 안 스위치로 묶습니다. 밖에 노출하려면 포트 매핑이 필요합니다.
- **host** — 격리 없이 호스트 네트워크를 그대로 씁니다. 포트 매핑이 무시되고(\`-p\`를 쓰면 경고), Docker Desktop에서는 Settings > Resources > Network에서 켜야 합니다.
- 그 외 none·overlay(여러 호스트)·macvlan·ipvlan은 단일 서버 운영에서 드뭅니다.

## 기본 bridge와 사용자 정의 bridge는 다르다

\`docker run\`에 아무것도 안 붙이면 **기본 bridge**에 붙는데, 여기서는 **컨테이너 이름으로 서로를 못 찾습니다**. 직접 만든 네트워크에서만 내장 DNS 서버가 이름을 풀어 줍니다.

\`\`\`bash
docker network create app-net
docker run -d --name db --network app-net postgres:17
docker run -d --name api --network app-net -p 8080:8080 api:1.2.0
# api 컨테이너 안에서는 db:5432 로 바로 접속
docker network inspect app-net   # 연결된 컨테이너와 IP 확인
\`\`\`

아파트 내선 전화와 같습니다. 같은 단지(사용자 정의 네트워크) 안에서는 "101동 관리실"(컨테이너 이름)로 걸고, 다른 단지와는 대표번호(포트 매핑)로만 통합니다.

Docker Compose는 이를 자동으로 합니다. 프로젝트마다 사용자 정의 네트워크를 만들어 모든 서비스를 붙이므로 서비스 이름 \`db\`가 곧 호스트 이름입니다. 앱의 DB 주소는 \`localhost\`가 아니라 \`db\`여야 합니다.

## 여기서 막힌다면

- \`getaddrinfo ENOTFOUND db\` → 두 컨테이너가 같은 사용자 정의 네트워크에 없습니다. \`docker network inspect\`로 확인하세요.
- \`ECONNREFUSED 127.0.0.1:5432\` → 컨테이너 안의 \`localhost\`는 그 컨테이너 자신입니다. 주소를 서비스 이름으로 바꾸세요.

> 💡 **핵심**: 컨테이너끼리는 **사용자 정의 네트워크 + 컨테이너 이름**으로, 바깥과는 포트 매핑으로만 통합니다. 기본 bridge에는 이름 DNS가 없습니다.`,
          illustration: {
            type: "steps",
            title: "컨테이너 이름으로 통신하기까지",
            steps: [
              {
                label: "사용자 정의 네트워크 만들기",
                sublabel: "docker network create app-net",
                icon: "network",
              },
              {
                label: "컨테이너를 같은 네트워크에 연결",
                sublabel: "--network app-net --name db / api",
                icon: "link",
              },
              {
                label: "이름으로 호출",
                sublabel: "api → db:5432 (내장 DNS가 IP로 변환)",
                icon: "route",
              },
              {
                label: "바깥에는 포트 매핑만",
                sublabel: "-p 8080:8080 — db는 외부에 노출 안 함",
                icon: "shield",
              },
            ],
            caption: "이름 DNS는 사용자 정의 네트워크에서만 켜집니다 — Compose는 이 4단계를 자동으로 해 줍니다.",
          },
        },
        {
          slug: "volumes-vs-bind-mounts",
          title: "Docker 볼륨 vs 바인드 마운트: 개발과 운영에서 다르게",
          minutes: 5,
          content: `컨테이너 안에 쓴 파일은 컨테이너를 지우면 사라집니다. 남겨야 할 데이터는 밖에 두어야 하는데, 방법이 둘이고 **개발과 운영에서 답이 다릅니다**.

## 두 방식의 차이

- **바인드 마운트** — 내 컴퓨터의 폴더를 컨테이너 경로에 그대로 연결합니다. 저장 즉시 보이므로 **개발 중 소스 반영**에 씁니다. 호스트 경로·UID 권한에 묶이는 것이 단점입니다.
- **Docker 볼륨** — Docker가 자기 저장 영역에 만들어 관리합니다. 호스트 경로를 몰라도 되고, \`docker volume\` 명령으로 목록·백업·삭제가 됩니다. 공식 문서도 **데이터 영속화의 기본 수단**으로 권장합니다.

비유하면 바인드 마운트는 내 책상 서랍을 동료에게 열어 주는 것, Docker 볼륨은 회사 문서 창고에 맡기는 것입니다.

\`\`\`bash
# 운영: 이름 있는 Docker 볼륨 (권장, --mount가 -v보다 명시적)
docker run -d --name db \\
  --mount type=volume,src=pgdata,dst=/var/lib/postgresql/data postgres:17
# 개발: 소스 폴더 바인드 마운트, 설정은 읽기 전용(ro)으로
docker run -d --mount type=bind,src=$(pwd)/src,dst=/app/src api:dev
docker run -d -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx
docker volume ls && docker volume inspect pgdata
\`\`\`

## 운영에서 꼭 지킬 것

- **DB 데이터는 반드시 Docker 볼륨에.** 컨테이너를 새 이미지로 교체해도 데이터는 남습니다.
- **설정 파일은 읽기 전용(\`:ro\`)으로** 마운트해 컨테이너가 고치지 못하게 합니다.
- **백업은 볼륨 단위로.** 예: \`docker run --rm -v pgdata:/data -v $(pwd):/backup alpine tar czf /backup/pgdata.tgz -C /data .\`
- Compose에서는 최상위 \`volumes:\`에 이름을 선언하고 서비스에서 \`pgdata:/var/lib/postgresql/data\`처럼 씁니다(다음 레슨).

## 여기서 막힌다면

- \`permission denied\`(바인드 마운트) → 컨테이너 안 사용자 UID와 호스트 폴더 소유자가 다릅니다. \`--user $(id -u):$(id -g)\`로 맞추거나 Docker 볼륨으로 바꾸세요.
- 데이터가 사라졌다 → \`docker compose down -v\`의 \`-v\`는 볼륨까지 지웁니다. 운영에서는 습관적으로 붙이지 마세요.

> 💡 **핵심**: **개발은 바인드 마운트, 운영은 Docker 볼륨.** 그리고 운영 데이터가 든 볼륨을 지우는 명령은 손이 기억하지 않게 하세요.`,
          illustration: {
            type: "compare",
            title: "바인드 마운트 vs Docker 볼륨",
            columns: [
              {
                title: "바인드 마운트 (개발)",
                icon: "code",
                tone: "accent",
                items: [
                  "호스트 폴더 → 컨테이너 경로 직접 연결",
                  "코드 저장 즉시 반영",
                  "호스트 경로·UID 권한에 의존",
                  "설정 파일은 :ro 로 읽기 전용",
                ],
              },
              {
                title: "Docker 볼륨 (운영)",
                icon: "hard-drive",
                tone: "primary",
                items: [
                  "Docker가 관리하는 저장 영역",
                  "docker volume ls/inspect/prune 로 관리",
                  "컨테이너 교체·재생성에도 데이터 유지",
                  "백업·공유가 쉬움 — DB 데이터의 자리",
                ],
              },
            ],
            caption: "같은 '밖에 두기'지만, 관리 주체가 나(호스트 경로)냐 Docker냐가 갈림길입니다.",
          },
        },
        {
          slug: "compose-production",
          title: "Compose 실전: healthcheck·depends_on(condition)·env_file·profiles",
          minutes: 7,
          content: `\`docker compose up\`을 했더니 앱이 "DB 연결 실패"로 죽고, 30초 뒤 다시 올리면 됩니다. DB 컨테이너가 **시작됐지만 아직 준비되지 않았기** 때문입니다. 운영용 Compose는 이 "준비됨"을 명시합니다.

## 헬스체크로 "준비됨"을 정의한다

\`\`\`yaml
services:
  db:
    image: postgres:17
    env_file: .env.db
    volumes: ["pgdata:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s
volumes:
  pgdata:
\`\`\`

\`test\`가 종료 코드 0이면 healthy. \`start_period\` 동안의 실패는 세지 않습니다.

## 준비된 뒤에 시작하게 한다

\`\`\`yaml
  api:
    build: .
    env_file: [.env.db, .env.api]
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
  adminer:
    image: adminer
    profiles: ["debug"]
\`\`\`

- \`depends_on\` 짧은 문법(이름만 나열)은 **시작 순서만** 보장합니다. \`condition: service_healthy\`라야 헬스체크 통과까지 기다립니다.
- \`env_file\`은 파일의 값을 **컨테이너 환경변수**로 넣습니다. 프로젝트 루트의 \`.env\`는 \`compose.yaml\`의 \`\${VAR}\` 치환에만 쓰이고 컨테이너에 주입되지 않습니다.
- \`profiles\`가 붙은 서비스는 \`docker compose --profile debug up -d\`로 켤 때만 뜹니다.

식당으로 치면 주방(DB)이 "첫 주문 받을 수 있다"고 신호한 뒤 홀(앱) 문을 여는 것입니다. \`docker compose up -d --wait\`는 모두 running/healthy가 될 때까지 기다립니다. \`docker compose ps\`의 STATUS 열에 \`(healthy)\`가 보이면 성공입니다.

## 여기서 막힌다면

- \`dependency failed to start: container shop-db-1 is unhealthy\` → 헬스체크 명령이 틀렸거나(\`docker compose logs db\`), 사용자·DB 이름이 \`.env.db\`와 다릅니다.
- \`the attribute 'version' is obsolete\` 경고 → \`version:\` 줄을 지우세요.
- \`env file .env.db not found\` → 경로는 \`compose.yaml\`이 있는 폴더 기준입니다.

> 💡 **핵심**: 운영용 Compose의 세 줄 — **healthcheck로 준비를 정의하고, condition: service_healthy로 기다리고, profiles로 운영 기본 기동을 가볍게.**`,
          illustration: {
            type: "flow",
            title: "condition: service_healthy 가 만드는 기동 순서",
            nodes: [
              {
                label: "db 컨테이너 시작",
                sublabel: "postgres 프로세스 기동 중 — 아직 연결 불가",
                icon: "database",
                tone: "muted",
              },
              {
                label: "헬스체크 반복",
                sublabel: "pg_isready · 10초 간격 · start_period 20초",
                icon: "activity",
                tone: "accent",
                edgeLabel: "종료 코드 0이 나올 때까지",
              },
              {
                label: "db: healthy",
                sublabel: "docker compose ps → Up 31s (healthy)",
                icon: "check",
                tone: "success",
              },
              {
                label: "api 컨테이너 시작",
                sublabel: "depends_on db condition: service_healthy",
                icon: "rocket",
                tone: "primary",
                edgeLabel: "이때 비로소 시작",
              },
            ],
            caption: "'시작됨'과 '준비됨' 사이의 30초가 재시작 루프의 원인 — 헬스체크가 그 간극을 메웁니다.",
          },
          demo: {
            title: "compose.yaml에 헬스체크를 넣고 healthy 확인하기",
            app: {
              kind: "code-editor",
              windowTitle: "compose.yaml — shop",
              files: [
                { id: "f-compose", name: "compose.yaml", active: true },
                { id: "f-envdb", name: ".env.db" },
                { id: "f-docker", name: "Dockerfile" },
              ],
              code: [
                { id: "c1", text: "services:" },
                { id: "c2", text: "db:", indent: 1 },
                { id: "c3", text: "image: postgres:17", indent: 2 },
                { id: "c4", text: "env_file: .env.db", indent: 2 },
                { id: "c5", text: 'volumes: ["pgdata:/var/lib/postgresql/data"]', indent: 2 },
                { id: "c6", text: "healthcheck:", indent: 2, tone: "add", hidden: true },
                { id: "c7", text: 'test: ["CMD-SHELL", "pg_isready -U app"]', indent: 3, tone: "add", hidden: true },
                { id: "c8", text: "interval: 10s", indent: 3, tone: "add", hidden: true },
                { id: "c9", text: "retries: 5", indent: 3, tone: "add", hidden: true },
                { id: "c10", text: "start_period: 20s", indent: 3, tone: "add", hidden: true },
                { id: "c11", text: "api:", indent: 1 },
                { id: "c12", text: "build: .", indent: 2 },
                { id: "c13", text: "depends_on:", indent: 2, tone: "add", hidden: true },
                { id: "c14", text: "db:", indent: 3, tone: "add", hidden: true },
                { id: "c15", text: "condition: service_healthy", indent: 4, tone: "add", hidden: true },
                { id: "c16", text: "adminer:", indent: 1 },
                { id: "c17", text: "image: adminer", indent: 2 },
                { id: "c18", text: 'profiles: ["debug"]', indent: 2, tone: "add", hidden: true },
                { id: "c19", text: "volumes:" },
                { id: "c20", text: "pgdata:", indent: 1 },
              ],
              terminal: [
                { id: "t1", text: "docker compose up -d --wait", tone: "cmd", hidden: true },
                { id: "t2", text: "✔ Container shop-db-1   Healthy", tone: "ok", hidden: true },
                { id: "t3", text: "✔ Container shop-api-1  Started", tone: "ok", hidden: true },
                { id: "t4", text: "docker compose ps", tone: "cmd", hidden: true },
                { id: "t5", text: "NAME         SERVICE   STATUS", tone: "out", hidden: true },
                { id: "t6", text: "shop-db-1    db        Up 31 seconds (healthy)", tone: "ok", hidden: true },
                { id: "t7", text: "shop-api-1   api       Up 12 seconds", tone: "ok", hidden: true },
                { id: "t8", text: "docker compose --profile debug up -d", tone: "cmd", hidden: true },
                { id: "t9", text: "✔ Container shop-adminer-1  Started", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① db 서비스에 헬스체크를 추가합니다" },
              { t: "type", target: "c6", text: "healthcheck:" },
              { t: "type", target: "c7", text: 'test: ["CMD-SHELL", "pg_isready -U app"]' },
              { t: "type", target: "c8", text: "interval: 10s" },
              { t: "type", target: "c9", text: "retries: 5" },
              { t: "type", target: "c10", text: "start_period: 20s" },
              { t: "caption", text: "② api는 db가 healthy가 된 뒤에만 시작하도록 합니다" },
              { t: "type", target: "c13", text: "depends_on:" },
              { t: "type", target: "c14", text: "db:" },
              { t: "type", target: "c15", text: "condition: service_healthy" },
              { t: "caption", text: "③ 관리 도구 adminer는 debug 프로필에서만 뜨게 합니다" },
              { t: "type", target: "c18", text: 'profiles: ["debug"]' },
              { t: "caption", text: "④ --wait 로 모두 준비될 때까지 기다리며 실행합니다" },
              { t: "type", target: "t1", text: "docker compose up -d --wait" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "caption", text: "⑤ STATUS 열에서 (healthy)를 확인합니다" },
              { t: "type", target: "t4", text: "docker compose ps" },
              { t: "reveal", target: "t5" },
              { t: "reveal", target: "t6" },
              { t: "reveal", target: "t7" },
              { t: "caption", text: "⑥ 프로필을 켜면 adminer도 추가로 올라옵니다" },
              { t: "type", target: "t8", text: "docker compose --profile debug up -d" },
              { t: "reveal", target: "t9" },
              { t: "caption", text: "✅ db healthy → api 시작 — 재시작 루프 없는 기동 순서 완성" },
            ],
          },
        },
      ],
    },
    {
      slug: "security-and-delivery",
      title: "보안과 전달",
      description: "비루트·시크릿·취약점 스캔·리소스 제한, 그리고 CI로 자동화",
      lessons: [
        {
          slug: "non-root-and-secrets",
          title: "비루트 실행과 시크릿: 이미지에 비밀번호를 굽지 않기",
          minutes: 6,
          content: `컨테이너는 기본적으로 **root로 실행**되고, Dockerfile에 적은 값은 **누구나 볼 수 있습니다**. 보안은 이 두 기본값을 뒤집는 데서 시작합니다.

## 비루트: USER 한 줄

- 공식 \`node\` 이미지에는 UID 1000의 \`node\` 사용자가 있어 \`USER node\`면 끝입니다.
- 없으면 만듭니다. Debian \`RUN groupadd -r app && useradd -r -g app app\`, Alpine \`RUN addgroup -S app && adduser -S app -G app\`.
- 앱 파일 소유자도 맞춥니다: \`COPY --chown=app:app . .\`
- 비루트는 1024 미만 포트를 못 엽니다. Docker(Engine 20.10 이후)는 컨테이너 안에서 풀어 주지만 host 네트워크·Kubernetes에서는 막힐 수 있으니, 앱은 8080처럼 높은 포트로 열고 \`-p 80:8080\`으로 연결하세요.

출입카드로 치면 root는 모든 층이 열리는 관리자 카드입니다. 앱에는 자기 층만 찍히는 직원 카드(비루트)만 줍니다.

## 시크릿: 빌드와 실행을 나눠서

**ARG·ENV로 비밀값을 넘기지 마세요.** \`docker history\`에 남습니다. 대신 BuildKit 시크릿 마운트를 씁니다.

\`\`\`dockerfile
# 빌드 중에만 /run/secrets/npmrc 로 보이고, 레이어에는 남지 않음
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci --omit=dev
\`\`\`

\`\`\`bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t api:1.2.0 .
\`\`\`

실행 시점 비밀값은 Compose의 \`secrets\`로 넣습니다. \`/run/secrets/<이름>\`에 읽기 전용 파일로 나타나고, 공식 이미지 다수가 \`POSTGRES_PASSWORD_FILE\`처럼 \`_FILE\` 변수로 이를 받습니다.

## 여기서 막힌다면

- \`EACCES: permission denied, open '/app/logs/app.log'\` → \`USER\` 전환 전에 \`RUN mkdir -p /app/logs && chown app:app /app/logs\`를 넣으세요.
- \`secret npmrc: not found\` → \`--secret id=\`와 Dockerfile의 \`id\`가 다릅니다.

> 💡 **핵심**: **USER로 권한을 내리고, 비밀값은 레이어가 아니라 마운트로.** 이미지는 "누구나 열어 보는 상자"입니다.`,
          illustration: {
            type: "stack",
            title: "컨테이너 방어층 (위 = 앱에 가까움)",
            layers: [
              {
                label: "앱 프로세스 — USER app (비루트)",
                sublabel: "뚫려도 root가 아님 · 8080 같은 높은 포트 사용",
                icon: "user",
                tone: "primary",
              },
              {
                label: "시크릿 마운트",
                sublabel: "빌드: --mount=type=secret · 실행: /run/secrets/<이름>",
                icon: "key",
                tone: "accent",
              },
              {
                label: "파일시스템 — --read-only + --tmpfs /tmp",
                sublabel: "악성 파일 쓰기 차단",
                icon: "lock",
                tone: "accent",
              },
              {
                label: "커널 권한 — --cap-drop ALL, no-new-privileges",
                sublabel: "권한 상승 경로 제거",
                icon: "shield",
                tone: "muted",
              },
            ],
            caption: "한 층이 뚫려도 다음 층이 막습니다 — 비루트는 그중 가장 싸고 효과 큰 층입니다.",
          },
        },
        {
          slug: "image-scanning",
          title: "취약점 스캔: Docker Scout·Trivy로 CVE 찾고 고치기",
          minutes: 7,
          content: `내 코드에 버그가 없어도 베이스 이미지의 OpenSSL·zlib에 알려진 결함이 있으면 취약한 이미지입니다. 취약점 스캔은 SBOM을 CVE 데이터베이스와 대조하는 일입니다.

## Docker Scout와 Trivy

Docker Scout는 Docker Desktop에 내장돼 있습니다.

\`\`\`bash
docker scout quickview api:1.0          # 심각도별 개수 + 베이스 이미지 교체 제안
docker scout cves --only-severity critical,high api:1.0
docker scout recommendations api:1.0    # 더 안전한 베이스 이미지 태그 추천
\`\`\`

\`0C 2H 5M 20L\`은 Critical/High/Medium/Low 개수입니다. **Updated base image** 행은 베이스 이미지 태그만 바꿔도 사라지는 CVE입니다.

Trivy는 오픈소스 표준 스캐너입니다.

\`\`\`bash
trivy image --severity HIGH,CRITICAL --ignore-unfixed api:1.0
trivy image --exit-code 1 --severity CRITICAL api:1.0   # CI 차단용
\`\`\`

끝의 \`Total: 12 (UNKNOWN: 0, LOW: 6, MEDIUM: 4, HIGH: 2, CRITICAL: 0)\` 요약을 보세요. \`--ignore-unfixed\`는 수정 버전 없는 항목을 숨겨 **지금 고칠 수 있는 것**만 남깁니다.

식품 리콜 대조와 같습니다. 재료 목록(SBOM)을 리콜 공고(CVE 데이터베이스)와 맞춰 보고, 대체 재료(수정 버전)가 있는 것부터 바꿉니다.

## 고치는 순서

1. **베이스 이미지 교체** — CVE 대부분은 OS 패키지에서 옵니다. 최신 패치 이미지 태그로 재빌드하거나 full → slim → Distroless/Docker Hardened Images로 옮기세요.
2. **앱 의존성 올리기** — \`npm audit fix\`, \`pip-audit\` 등으로 라이브러리 버전을 올립니다.
3. **정기 재빌드** — 코드가 안 바뀌어도 매주 다시 빌드·스캔하세요. CVE는 매일 새로 공개됩니다.

## 여기서 막힌다면

- \`docker: 'scout' is not a docker command\` → 리눅스 Engine에는 플러그인이 없습니다. docs.docker.com/scout/install의 스크립트(\`docker/scout-cli\`)로 설치하세요.
- \`docker scout\`가 로그인을 요구 → Docker Hub 계정으로 \`docker login\` 후 다시 실행합니다.

> 💡 **핵심**: 숫자에 압도되지 마세요. **High/Critical + 수정 버전 있음**만 먼저 고치고, 가장 효과 큰 조치는 거의 항상 **베이스 이미지 교체**입니다.`,
          illustration: {
            type: "cycle",
            title: "취약점 대응 사이클",
            center: "매주 반복",
            nodes: [
              { label: "스캔", sublabel: "docker scout cves / trivy image", icon: "search" },
              { label: "선별", sublabel: "High·Critical + 수정 버전 있음", icon: "filter" },
              { label: "수정", sublabel: "베이스 이미지 태그 교체·의존성 업데이트", icon: "wrench" },
              { label: "재빌드·재스캔", sublabel: "0C 0H 확인 후 푸시", icon: "refresh" },
            ],
            caption: "CVE는 계속 새로 공개되므로 '한 번 통과'가 아니라 주기적인 사이클로 운영합니다.",
          },
          demo: {
            title: "스캔 → 베이스 이미지 교체 → 재스캔 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "Dockerfile — api (취약점 스캔)",
              files: [
                { id: "f-docker", name: "Dockerfile", active: true },
                { id: "f-pkg", name: "package.json" },
                { id: "f-ignore", name: ".dockerignore" },
              ],
              code: [
                { id: "c1", text: "FROM node:24", tone: "del" },
                { id: "c2", text: "FROM node:24-slim", tone: "add", hidden: true },
                { id: "c3", text: "WORKDIR /app" },
                { id: "c4", text: "COPY package*.json ./" },
                { id: "c5", text: "RUN npm ci --omit=dev" },
                { id: "c6", text: "COPY . ." },
                { id: "c7", text: "USER node" },
                { id: "c8", text: 'CMD ["node", "server.js"]' },
              ],
              terminal: [
                { id: "t1", text: "docker scout quickview api:1.0", tone: "cmd", hidden: true },
                { id: "t2", text: "Target              api:1.0        1C   4H  12M  38L", tone: "err", hidden: true },
                { id: "t3", text: "Base image          node:24        1C   4H  12M  38L", tone: "out", hidden: true },
                { id: "t4", text: "Updated base image  node:24-slim   0C   0H   2M   9L", tone: "ok", hidden: true },
                { id: "t5", text: "docker build -t api:1.1 .", tone: "cmd", hidden: true },
                { id: "t6", text: "[+] Building 38.4s (12/12) FINISHED", tone: "out", hidden: true },
                { id: "t7", text: "docker scout cves api:1.1", tone: "cmd", hidden: true },
                { id: "t8", text: "✓ Image stored for indexing", tone: "ok", hidden: true },
                { id: "t9", text: "✓ Indexed 212 packages", tone: "ok", hidden: true },
                { id: "t10", text: "✗ Detected 2 vulnerable packages with a total of 11 vulnerabilities", tone: "out", hidden: true },
                { id: "t11", text: "  0C   0H   2M   9L   (critical/high 0건)", tone: "ok", hidden: true },
                { id: "t12", text: "trivy image -s HIGH,CRITICAL api:1.1", tone: "cmd", hidden: true },
                { id: "t13", text: "Total: 0 (HIGH: 0, CRITICAL: 0)", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 현재 이미지를 quickview로 훑어봅니다" },
              { t: "type", target: "t1", text: "docker scout quickview api:1.0" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "reveal", target: "t4" },
              { t: "caption", text: "② CVE 대부분이 베이스 이미지에서 옵니다 — 제안된 slim으로 교체" },
              { t: "move", target: "c1" },
              { t: "dblclick", target: "c1" },
              { t: "type", target: "c2", text: "FROM node:24-slim" },
              { t: "caption", text: "③ 새 이미지 태그로 다시 빌드합니다" },
              { t: "type", target: "t5", text: "docker build -t api:1.1 ." },
              { t: "reveal", target: "t6" },
              { t: "caption", text: "④ Docker Scout로 재스캔합니다" },
              { t: "type", target: "t7", text: "docker scout cves api:1.1" },
              { t: "reveal", target: "t8" },
              { t: "reveal", target: "t9" },
              { t: "reveal", target: "t10" },
              { t: "reveal", target: "t11" },
              { t: "caption", text: "⑤ Trivy로 High/Critical만 교차 확인합니다" },
              { t: "type", target: "t12", text: "trivy image -s HIGH,CRITICAL api:1.1" },
              { t: "reveal", target: "t13" },
              { t: "move", target: "t13" },
              { t: "caption", text: "✅ 1C 4H → 0C 0H — FROM 한 줄 교체로 배포 차단 기준 통과" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "resource-limits-and-logs",
          title: "리소스 제한과 로그 관리: 컨테이너 하나가 서버를 삼키지 않게",
          minutes: 6,
          content: `제한 없는 컨테이너는 메모리를 서버 전체까지 씁니다. 커널이 아무 프로세스나 죽이고, 로그는 디스크가 찰 때까지 자랍니다. 둘 다 **기본값이 "무제한"**이라서 생기는 사고입니다.

## 메모리와 CPU 제한

\`\`\`bash
docker run -d --name api \\
  --memory=512m --memory-swap=512m \\
  --cpus=1.5 --pids-limit=200 \\
  api:1.2.0
docker stats --no-stream        # MEM USAGE / LIMIT 열로 적용 확인
\`\`\`

- \`--memory\`를 넘으면 OOM으로 죽습니다. \`docker inspect --format '{{.State.OOMKilled}}' api\`가 \`true\`, 종료 코드 137이면 이 경우입니다.
- \`--memory-swap\`을 \`--memory\`와 같게 두면 스왑 없이 "바로 죽고 재시작"으로 예측 가능해집니다. \`--cpus=1.5\`는 넘어도 느려질 뿐입니다.
- Compose에서는 \`deploy.resources.limits\`에 \`cpus: "1.5"\`, \`memory: 512M\`로 적습니다. Swarm 없이 \`docker compose up\`에서도 적용됩니다.

공유 냉장고에 칸을 나누지 않으면 한 사람의 김치통이 전체를 차지합니다. 제한은 "네 칸은 여기까지"라는 표시입니다.

## 로그 로테이션

기본 로그 드라이버 \`json-file\`은 \`max-size\`가 **기본 무제한**입니다. \`/etc/docker/daemon.json\`에 서버 기본값을 적고 데몬을 재시작하세요.

\`\`\`json
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
\`\`\`

- 값은 숫자도 **문자열(따옴표)**로. 컨테이너당 10MB × 3개 = 30MB로 묶이고, 기존 컨테이너에는 적용되지 않으니 다시 만드세요.
- \`local\` 드라이버는 기본값(20MB × 5개)으로 로테이션이 켜져 있습니다. 개별 컨테이너는 \`--log-opt max-size=10m\`, Compose는 \`logging.options\`에 같은 키를.
- 앱 로그는 파일이 아니라 **표준 출력**으로. 그래야 \`docker logs\`와 로그 수집기가 받아갑니다.

## 죽으면 다시 살리기

\`--restart unless-stopped\`(Compose: \`restart: unless-stopped\`)는 OOM·크래시 후 자동 재시작합니다. 재시작 루프를 숨길 수 있으니 헬스체크와 함께.

> 💡 **핵심**: **--memory와 max-size, 두 기본값을 반드시 바꾸세요.** 이 둘을 안 건드린 서버는 언젠가 새벽에 전화를 걸어옵니다.`,
          illustration: {
            type: "grid",
            title: "컨테이너 하나가 서버를 삼키는 4가지 경로와 차단 옵션",
            items: [
              {
                label: "메모리 폭주",
                sublabel: "--memory=512m --memory-swap=512m → OOM 후 재시작",
                icon: "cpu",
                tone: "warning",
              },
              {
                label: "CPU 독점",
                sublabel: "--cpus=1.5 → 초과 시 느려질 뿐 다른 컨테이너 보호",
                icon: "gauge",
                tone: "accent",
              },
              {
                label: "프로세스 폭주",
                sublabel: "--pids-limit=200 → fork 폭탄 차단",
                icon: "alert",
                tone: "accent",
              },
              {
                label: "로그로 디스크 가득",
                sublabel: "max-size=10m, max-file=3 → 컨테이너당 30MB",
                icon: "hard-drive",
                tone: "warning",
              },
              {
                label: "확인",
                sublabel: "docker stats · inspect .State.OOMKilled",
                icon: "eye",
                tone: "muted",
              },
              {
                label: "복구",
                sublabel: "restart: unless-stopped + 헬스체크",
                icon: "refresh",
                tone: "success",
              },
            ],
            caption: "네 경로 모두 기본값이 '무제한'입니다 — 서버를 만들 때 daemon.json과 실행 옵션으로 한 번에 닫으세요.",
          },
        },
        {
          slug: "ci-build-and-next",
          title: "GitHub Actions로 빌드·푸시 자동화 + 다음 단계",
          minutes: 6,
          content: `지금까지 배운 것을 매번 손으로 하면 결국 누군가 빠뜨립니다. 코드를 올리면 **빌드 → 스캔 → 레지스트리 푸시**가 자동으로 도는 파이프라인을 만듭니다.

## GHCR로 푸시하는 워크플로

저장소에 \`.github/workflows/docker.yml\`을 만듭니다. GHCR은 별도 시크릿 없이 워크플로의 \`GITHUB_TOKEN\`으로 로그인됩니다.

\`\`\`yaml
on: { push: { branches: [main] } }
permissions:
  contents: read
  packages: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: docker/setup-buildx-action@v4
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
\`\`\`

\`\`\`yaml
      - uses: docker/build-push-action@v7
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
            ghcr.io/\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

- \`permissions.packages: write\`가 없으면 푸시가 거부됩니다. \`type=gha\`는 레이어 캐시를 GitHub Actions에 저장해 다음 실행을 빠르게 합니다.
- 이미지 태그에 커밋 SHA를 넣으면 **어떤 코드로 만든 이미지인지** 추적됩니다. 이미지 이름은 소문자여야 하니 저장소에 대문자가 있으면 \`docker/metadata-action@v6\`으로 이미지 태그를 만드세요.
- 빌드와 푸시 사이에 \`trivy image --exit-code 1 --severity CRITICAL\` 스텝을 넣으면 **취약한 이미지는 레지스트리에 올라가지 않습니다**.

택배 분류 센터처럼, 컨베이어(파이프라인)가 검수(스캔)와 목적지 라벨(이미지 태그)을 붙여 창고(레지스트리)로 보냅니다.

## 여기서 막힌다면

- \`denied: permission_denied: write_package\` → \`permissions.packages: write\` 누락이거나, 같은 이름의 패키지가 다른 저장소에 연결돼 있습니다.
- \`docker exporter does not currently support exporting manifest lists\` → 멀티 플랫폼인데 \`push: true\`가 빠진 것입니다.

## 다음 단계

서버 한 대를 Compose로 운영하는 단계는 여기까지입니다. 컨테이너 수십 개, 서버 여러 대가 되면 "죽으면 다시 살리기"와 "늘리고 줄이기"를 사람이 못 따라갑니다. 다음 강의 **"Kubernetes 입문: 컨테이너 오케스트레이션 첫걸음"**이 그 문제를 다룹니다. 여기서 만든 작고 안전한 이미지가 그대로 Kubernetes의 재료입니다.

> 💡 **핵심**: 좋은 이미지는 사람이 아니라 **파이프라인이 만듭니다.** 자동화한 순간 체크리스트는 "기억할 것"에서 "지켜지는 것"으로 바뀝니다.`,
          illustration: {
            type: "steps",
            title: "push 한 번에 일어나는 일",
            steps: [
              {
                label: "코드 push (main)",
                sublabel: "GitHub Actions 워크플로 트리거",
                icon: "git-branch",
              },
              {
                label: "buildx 빌드",
                sublabel: "amd64 + arm64 · type=gha 캐시 재사용",
                icon: "package",
              },
              {
                label: "취약점 스캔",
                sublabel: "Critical/High 있으면 여기서 실패",
                icon: "bug",
              },
              {
                label: "GHCR 푸시",
                sublabel: "ghcr.io/owner/repo:<커밋 SHA>",
                icon: "upload",
              },
            ],
            caption: "3단계에서 멈추는 것이 이 파이프라인의 진짜 가치입니다 — 취약한 이미지는 레지스트리에 도달하지 못합니다.",
          },
        },
      ],
    },
  ],
};
