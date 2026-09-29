import type { Course } from "../types";

/**
 * Docker 입문 (인프라 & DevOps 1/6단계) — 터미널을 조금 써 본 주니어 개발자·비전공 취준생용 첫 강의.
 *
 * 사실 검증 메모 (2026-09 기준 웹 검색):
 * - docker run 옵션 -d/--detach, -p/--publish([HOST_IP:]HOST_PORT:CONTAINER_PORT), -e/--env, -v/--volume,
 *   --name, --rm, -i/--interactive, -t/--tty (docs.docker.com/reference/cli/docker/container/run)
 * - docker run = 이미지 없으면 pull → create → 읽기·쓰기 레이어 할당 → 네트워크 연결 → start (docs.docker.com/get-started/docker-overview)
 * - docker stop: SIGTERM 후 기본 10초(리눅스) 유예 뒤 SIGKILL (docs.docker.com/reference/cli/docker/container/stop)
 * - docker ps 컬럼: CONTAINER ID / IMAGE / COMMAND / CREATED / STATUS / PORTS / NAMES, -a·-q 옵션 (docs.docker.com)
 * - docker logs -f/--follow, --tail, --since, -t/--timestamps; docker exec -it CONTAINER sh (docs.docker.com)
 * - docker rm -f(실행 중 강제 삭제, SIGKILL), -v(익명 볼륨 함께 삭제, 이름 있는 볼륨은 유지) (docs.docker.com)
 * - Docker 볼륨: -v 이름:/경로 또는 --mount source=,target= (--mount 권장), docker volume create/ls/inspect/rm/prune (docs.docker.com/engine/storage/volumes)
 * - Dockerfile: FROM [--platform] image[:tag] [AS name], WORKDIR(없으면 자동 생성), COPY src dest, RUN,
 *   CMD exec 형식 ["a","b"] 권장 vs shell 형식(/bin/sh -c), EXPOSE는 문서용이며 포트를 실제 공개하지 않음 (docs.docker.com/reference/dockerfile)
 * - docker build -t name:tag . (마지막 인자 = 빌드 컨텍스트), -f 로 다른 Dockerfile 지정, docker build는 Buildx/BuildKit 기본 (docs.docker.com)
 * - 이미지 참조 형식 [HOST[:PORT]/]NAMESPACE/REPOSITORY[:TAG], 기본값 docker.io / library / latest,
 *   예: alpine = docker.io/library/alpine:latest (docs.docker.com/reference/cli/docker/image/tag)
 * - .dockerignore: 빌드 컨텍스트 루트에 위치, # 주석, ! 부정, ** 패턴, "transferring context: 13.16MB" 출력 (docs.docker.com/build/concepts/context)
 * - 빌드 캐시: 한 레이어가 바뀌면 그 뒤 레이어 전부 무효화 → 의존성 설치를 소스 복사보다 앞에 (docs.docker.com/build/cache)
 * - Compose: 기본 파일명 compose.yaml(권장)/compose.yml, 구형 docker-compose.yml도 인식. 최상위 version 키는 obsolete(경고 출력, 무시됨).
 *   이름 있는 볼륨은 최상위 volumes: 에 선언 필수. depends_on 짧은 형식 리스트. docker compose up/down/ps/logs/exec/build/pull,
 *   down -v 는 이름 있는 볼륨·익명 볼륨 삭제 (docs.docker.com/reference/compose-file, docs.docker.com/reference/cli/docker/compose)
 * - Docker Desktop 설치: macOS(Apple silicon/Intel 선택, Docker.dmg → Applications), Windows(WSL 2 백엔드, Windows 10/11 64-bit,
 *   Docker Desktop Installer.exe), 첫 실행 시 Subscription Service Agreement 동의 필수 (docs.docker.com/desktop/setup/install)
 * - Docker Desktop 라이선스: 개인·교육·비영리 오픈소스·소기업(직원 250명 미만 AND 연매출 1천만 달러 미만) 무료, 정부기관은 유료,
 *   Docker Engine(오픈소스)은 별도 라이선스로 무료 (docs.docker.com/subscription/desktop-license)
 * - Docker Desktop 구성: Docker Engine·CLI·Compose·Build·Kubernetes·Docker Scout 포함, Dashboard에 Containers/Images/Volumes/Builds 뷰 (docs.docker.com/desktop)
 * - Docker Hub pull 한도: 미인증 6시간당 100회(IPv4 주소 또는 IPv6 /64 기준), Personal 200회, Pro/Team/Business 무제한.
 *   초과 시 429 + "You have reached your pull rate limit. You may increase the limit by authenticating and upgrading" (docs.docker.com/docker-hub/usage)
 * - GHCR: echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin, 이름 ghcr.io/NAMESPACE/IMAGE:tag,
 *   PAT는 classic만 지원(fine-grained 불가), 스코프 read:packages/write:packages, 푸시된 패키지 기본 비공개 (docs.github.com/packages)
 * - BuildKit(기본 빌더)에서 컨텍스트 밖 COPY는 "forbidden path outside the build context"(구 빌더 문구)가 아니라
 *   failed to compute cache key: "/파일": not found 로 나타남 (github.com/moby/buildkit issues 2130)
 * - 검수(2026-09-30): 위 사실 재검증 완료 — pull 한도·429 문구, Desktop 라이선스, compose version 경고 문구, stop 10초, -dp 결합 표기,
 *   postgres 18 경로, Desktop 4.91.0/Engine 29.8.0, hello-world 문구, node:24-alpine, system prune 기본 볼륨 제외 (docs.docker.com, hub.docker.com, docs.github.com)
 * - hello-world 출력 "Hello from Docker! This message shows that your installation appears to be working correctly." (hub.docker.com/_/hello-world)
 * - nginx 이미지: 80 포트, 정적 파일 /usr/share/nginx/html, nginx:alpine 존재 (hub.docker.com/_/nginx)
 * - postgres 이미지: POSTGRES_PASSWORD 필수, 17 이하 데이터 경로 /var/lib/postgresql/data, 18+는 /var/lib/postgresql 하위로 변경 (hub.docker.com/_/postgres)
 * - node 이미지: 24(LTS)·22(LTS) 지원, node:24-alpine 태그 존재 (hub.docker.com/_/node)
 * - docker system prune: 기본은 중지 컨테이너·미사용 네트워크·dangling 이미지·빌드 캐시, -a 는 미사용 이미지 전부, --volumes 는 익명 볼륨 (docs.docker.com)
 * - 흔한 에러 문구: "Bind for 0.0.0.0:8080 failed: port is already allocated",
 *   "permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock" → usermod -aG docker $USER,
 *   "no space left on device", "exec format error"(CPU 아키텍처 불일치, --platform linux/amd64) (docs.docker.com, baeldung.com, 커뮤니티 다수)
 * - Docker Desktop 4.91.0(2026-09-14)이 Docker Engine v29.8.0 동봉 → 본문에는 "현재 29 계열"로만 표기 (docs.docker.com/desktop/release-notes)
 */
export const dockerBasics: Course = {
  slug: "docker-basics",
  title: "Docker 입문: 컨테이너로 어디서나 똑같이 실행하기",
  subtitle: "\"제 컴퓨터에선 되는데요\"를 끝내는 컨테이너 첫걸음 — 설치부터 나만의 이미지, Compose까지",
  description:
    "개발자의 첫 배포는 대부분 '내 컴퓨터에서는 되는데 서버에서는 안 되는' 경험으로 시작합니다. Docker는 프로그램과 실행 환경을 통째로 상자에 담아 어디서나 똑같이 실행하게 해 주는 도구입니다. 이 강의는 리눅스 지식이 없어도 따라올 수 있게, 컨테이너 개념 → Docker Desktop 설치 → 이미지와 컨테이너 다루기 → Dockerfile로 나만의 이미지 만들기 → Docker Compose로 앱+DB 함께 띄우기 → 레지스트리에 공유하기까지를 실제 명령어와 화면 데모로 안내합니다. 마지막에는 초보자가 반드시 만나는 에러 8개의 해결법을 사전처럼 정리했습니다.",
  category: "devops",
  level: "beginner",
  tags: ["Docker", "컨테이너", "Dockerfile", "Docker Compose", "DevOps 입문"],
  gradient: ["#0ea5e9", "#0369a1"],
  icon: "container",
  outcomes: [
    "컨테이너가 가상머신과 어떻게 다르고 왜 '어디서나 똑같이' 실행되는지 설명할 수 있다",
    "docker run·ps·logs·exec·stop·rm으로 컨테이너의 생명주기를 자유롭게 다룰 수 있다",
    "포트 매핑·환경변수·Docker 볼륨으로 컨테이너를 바깥 세상과 연결하고 데이터를 지킬 수 있다",
    "Dockerfile을 작성해 나만의 이미지를 빌드하고 이름 규칙에 맞게 태그를 붙일 수 있다",
    "Docker Compose로 앱과 데이터베이스를 파일 하나로 띄우고, 레지스트리에 이미지를 올릴 수 있다",
  ],
  modules: [
    {
      slug: "container-concepts",
      title: "컨테이너와 첫 만남",
      description: "컨테이너가 무엇이고 왜 필요한지, Docker의 구조와 설치까지",
      lessons: [
        {
          slug: "why-containers",
          title: "왜 컨테이너인가: \"제 컴퓨터에선 되는데요\"의 종말",
          minutes: 4,
          content: `개발자가 가장 많이 하는 변명이자 가장 많이 듣는 말이 있습니다. **"제 컴퓨터에서는 되는데요."** 컨테이너는 이 문장을 역사 속으로 보내기 위해 태어났습니다.

## 왜 내 컴퓨터에서만 될까

프로그램은 혼자 돌지 않습니다. 언어 런타임 버전, 라이브러리, 운영체제 설정, 환경변수가 모두 맞아야 합니다.

- 내 노트북에는 Node 24가, 서버에는 Node 18이 깔려 있습니다.
- 팀원은 Windows, 나는 macOS, 서버는 리눅스입니다.
- 신입이 들어오면 개발 환경 세팅에만 하루가 갑니다.

이 차이 하나하나가 "내 컴퓨터에서만 되는" 이유입니다.

## 컨테이너: 프로그램을 실행 환경째로 포장한다

해상 운송의 **해상 컨테이너**를 떠올려 보세요. 안에 무엇이 들었든 규격이 같아서, 어느 배·트럭·항구에서도 같은 방식으로 다룰 수 있습니다.

소프트웨어의 컨테이너도 같습니다. 프로그램 + 라이브러리 + 설정을 **컨테이너 이미지**라는 규격 상자에 담습니다. 그 상자는 노트북, 팀원 컴퓨터, 클라우드 서버 어디서든 **똑같이** 실행됩니다. Docker는 이 상자를 만들고 실행하는 가장 널리 쓰이는 도구입니다.

## 이 강의의 로드맵

1. **컨테이너와 첫 만남** — 개념, 구조, 설치 (모듈 1)
2. **이미지와 컨테이너 다루기** — run·ps·logs·exec, 포트·환경변수·Docker 볼륨 (모듈 2)
3. **나만의 이미지 만들기** — Dockerfile, 빌드, 이미지 태그, 캐시 (모듈 3)
4. **여러 컨테이너와 공유** — Docker Compose, 레지스트리, 에러 사전 (모듈 4)

리눅스를 몰라도 괜찮습니다. 명령어는 매번 한 줄씩 해부해 드립니다.

> 💡 **핵심**: 컨테이너는 "프로그램"이 아니라 **"프로그램 + 실행 환경"**을 포장합니다. 그래서 어디서나 똑같이 돕니다.`,
          illustration: {
            type: "compare",
            title: "환경 차이: 컨테이너 전과 후",
            columns: [
              {
                title: "컨테이너 이전",
                icon: "alert",
                tone: "warning",
                items: [
                  "컴퓨터마다 런타임 버전이 다름",
                  "\"설치 가이드\" 문서를 사람이 따라감",
                  "신입 온보딩에 하루 소요",
                  "서버 배포 때마다 새로운 에러",
                ],
              },
              {
                title: "컨테이너 이후",
                icon: "container",
                tone: "primary",
                items: [
                  "이미지 하나에 환경이 통째로 들어감",
                  "docker run 한 줄로 실행",
                  "노트북·팀원·서버가 같은 결과",
                  "\"내 컴퓨터에선 되는데\"가 사라짐",
                ],
              },
            ],
            caption: "차이를 없애는 방법은 환경을 맞추는 게 아니라 환경을 함께 포장하는 것입니다.",
          },
        },
        {
          slug: "container-vs-vm",
          title: "컨테이너 vs 가상머신: 무엇이 다른가",
          minutes: 5,
          content: `"격리된 환경"이라면 가상머신도 있지 않나요? 맞습니다. 그런데 컨테이너는 가상머신보다 **수십 배 가볍고 몇 초 만에 켜집니다.** 그 차이는 무엇을 공유하느냐에서 나옵니다.

## 가상머신: 컴퓨터 안의 완전한 컴퓨터

가상머신은 운영체제를 **통째로** 하나 더 올립니다. 그래서 무겁습니다.

- 이미지 크기가 수 GB, 부팅에 수십 초~수 분
- 가상머신마다 운영체제 커널이 따로 돌아 메모리를 많이 씀
- 대신 격리가 아주 강함 (다른 운영체제도 올릴 수 있음)

## 컨테이너: 커널은 공유, 나머지만 격리

컨테이너는 호스트 운영체제의 **커널을 함께 쓰고**, 프로그램과 라이브러리 층만 따로 갖습니다.

- 이미지 크기가 수십~수백 MB, 시작이 보통 1초 안팎
- 한 컴퓨터에 수십 개를 띄워도 부담이 적음
- 격리는 가상머신보다 약하지만 대부분의 앱 배포에는 충분

**아파트 단지**를 떠올리면 쉽습니다. 가상머신은 각자 땅을 파고 기초·배관·전기까지 다 놓은 단독주택입니다. 컨테이너는 한 건물의 구조(커널)를 공유하면서 세대별로 벽과 현관문(격리)만 따로 갖는 아파트입니다. 짓기 빠르고, 같은 땅에 훨씬 많이 들어갑니다.

## 그래서 둘은 경쟁자가 아니라 동료

실제 클라우드 서버는 대부분 가상머신 위에서 컨테이너를 돌립니다. macOS·Windows용 Docker Desktop도 내부에 작은 리눅스 가상머신을 두고, 그 안에서 컨테이너를 실행합니다. 컨테이너는 리눅스 커널이 필요하기 때문입니다.

> 💡 **핵심**: 가상머신은 **운영체제를 통째로** 격리하고, 컨테이너는 **커널을 공유하며 프로그램만** 격리합니다. 그래서 가볍고 빠릅니다.`,
          illustration: {
            type: "stack",
            title: "컨테이너가 서 있는 층",
            layers: [
              {
                label: "컨테이너 A · B · C",
                sublabel: "각자 프로그램 + 라이브러리만 따로",
                icon: "container",
                tone: "primary",
              },
              {
                label: "Docker (컨테이너 런타임)",
                sublabel: "컨테이너를 만들고 격리하고 실행",
                icon: "settings",
                tone: "accent",
              },
              {
                label: "호스트 운영체제 커널",
                sublabel: "모든 컨테이너가 공유 — 가상머신은 이 층을 각자 가짐",
                icon: "cpu",
                tone: "muted",
              },
              {
                label: "하드웨어",
                sublabel: "CPU · 메모리 · 디스크",
                icon: "server",
                tone: "muted",
              },
            ],
            caption: "커널 층을 공유하기 때문에 컨테이너는 가상머신보다 수십 배 가볍습니다.",
          },
        },
        {
          slug: "docker-architecture",
          title: "Docker의 구조: 클라이언트·데몬·레지스트리",
          minutes: 5,
          content: `\`docker run\`을 입력하면 뒤에서 무슨 일이 벌어질까요? 세 명의 등장인물만 알면 Docker의 모든 명령이 읽힙니다.

## 세 등장인물

- **Docker 클라이언트(\`docker\` CLI)** — 터미널에 치는 명령어. 직접 컨테이너를 만들지 않고 데몬에게 **요청**만 보냅니다.
- **Docker 데몬(\`dockerd\`)** — 항상 켜져 있는 일꾼. 이미지 내려받기, 컨테이너 생성·실행·삭제를 **실제로 수행**합니다.
- **레지스트리** — 이미지를 보관하는 창고. 기본은 Docker Hub, GHCR 등도 있습니다.

클라이언트와 데몬은 REST API로 대화합니다. 같은 컴퓨터에서는 \`/var/run/docker.sock\`이라는 유닉스 소켓(파일처럼 보이는 통신 통로)을 씁니다. 나중에 만나는 "permission denied ... docker.sock" 에러가 이 통로의 권한 문제입니다.

**식당으로 보면** 손님(클라이언트)이 주문(명령)을 넣으면 주방(데몬)이 요리(컨테이너)를 만듭니다. 재료(이미지)가 없으면 식자재 창고(레지스트리)에서 가져옵니다.

## \`docker run hello-world\` 한 줄의 여정

1. 클라이언트가 데몬에게 "hello-world 이미지로 컨테이너 실행" 요청
2. 로컬에 이미지가 없으면 데몬이 Docker Hub에서 내려받음(pull)
3. 데몬이 컨테이너를 만들고(create) 실행(start)
4. 출력이 데몬 → 클라이언트 → 터미널로 흘러옴

## Docker Desktop은 무엇인가

macOS·Windows에는 리눅스 커널이 없으므로, Docker Desktop이 작은 리눅스 가상머신 안에서 데몬을 돌립니다. CLI·Docker Compose·빌드 도구·Dashboard를 한 묶음으로 제공합니다. 리눅스 서버는 Docker Engine(데몬 + CLI)만 설치해도 됩니다.

> 💡 **핵심**: \`docker\` 명령은 **요청**, 데몬은 **실행**, 레지스트리는 **보관**. 에러가 나면 셋 중 어디서 막혔는지부터 보세요.`,
          illustration: {
            type: "flow",
            title: "docker run 한 줄이 지나가는 길",
            nodes: [
              {
                label: "docker CLI (클라이언트)",
                sublabel: "터미널에서 명령 입력",
                icon: "terminal",
                tone: "primary",
              },
              {
                label: "dockerd (데몬)",
                sublabel: "REST API로 요청 수신 · 실제 작업 수행",
                icon: "settings",
                tone: "accent",
                edgeLabel: "/var/run/docker.sock",
              },
              {
                label: "레지스트리 (Docker Hub · GHCR)",
                sublabel: "로컬에 이미지가 없으면 pull",
                icon: "cloud",
                tone: "muted",
                edgeLabel: "이미지 없을 때만",
              },
              {
                label: "컨테이너 실행",
                sublabel: "출력은 데몬 → CLI → 터미널",
                icon: "container",
                tone: "success",
              },
            ],
            caption: "명령을 치는 곳과 컨테이너가 실제로 도는 곳은 다릅니다 — 그래서 원격 서버도 같은 명령으로 다룰 수 있습니다.",
          },
        },
        {
          slug: "install-docker",
          title: "설치하기: Docker Desktop과 라이선스 확인",
          minutes: 6,
          content: `이제 손을 움직일 시간입니다. 설치는 10분이면 끝나지만, 회사에서 쓸 거라면 **라이선스 조건**부터 확인하세요.

## 라이선스: 나는 무료인가?

Docker Desktop이 무료(Docker Personal)인 경우:

- 개인 사용, 교육, 비영리 오픈소스 프로젝트
- **직원 250명 미만 그리고 연매출 1천만 달러 미만**인 소기업

**하나라도 넘는 회사**의 업무용은 유료(Pro/Team/Business)입니다. 정부기관은 무료 조건이 없습니다. 리눅스용 **Docker Engine은 오픈소스라 누구나 무료**.

## 설치 절차

- **macOS**: 칩(Apple silicon / Intel)에 맞는 Docker.dmg 다운로드 → Docker 아이콘을 Applications로 드래그 → 실행.
- **Windows**: Docker Desktop Installer.exe 실행 → **WSL 2** 백엔드(기본값) → 시작 메뉴에서 실행. Windows 10/11 64비트·BIOS 가상화 활성화 필요.
- **리눅스**: 공식 문서대로 Docker의 apt/dnf 저장소를 등록해 Docker Engine 설치(배포판 기본 패키지는 오래됨).

첫 실행 때 **Subscription Service Agreement(구독 서비스 약관)** 동의가 필수, 로그인은 선택입니다.

## 설치 확인 두 줄

\`\`\`bash
docker version          # Client와 Server 두 블록이 모두 나오면 성공
docker run hello-world  # "Hello from Docker!"가 보이면 끝
\`\`\`

Server 블록이 없으면 데몬이 아직 안 켜진 것이니 고래 아이콘이 안정될 때까지 기다리세요.

**여기서 막힌다면**

- **\`Cannot connect to the Docker daemon ... Is the docker daemon running?\`** → Docker Desktop이 꺼져 있음. 켜고 재시도.
- **Windows에서 WSL 관련 오류** → 관리자 PowerShell에서 \`wsl --update\` 후 재부팅.
- **리눅스에서 \`permission denied ... docker.sock\`** → \`sudo usermod -aG docker $USER\` 후 재로그인.

> 💡 **핵심**: 회사에서 쓰면 **250명·1천만 달러** 두 기준을 먼저 확인하세요. 설치 검증은 \`docker version\` + \`docker run hello-world\` 두 줄입니다.`,
          illustration: {
            type: "steps",
            title: "설치부터 첫 실행까지",
            steps: [
              {
                label: "라이선스 확인",
                sublabel: "개인·교육·소기업(250명·$10M 미만) 무료",
                icon: "clipboard",
              },
              {
                label: "설치 파일 내려받기",
                sublabel: "macOS 칩 종류 / Windows WSL 2",
                icon: "download",
              },
              {
                label: "첫 실행과 약관 동의",
                sublabel: "Subscription Service Agreement",
                icon: "check",
              },
              {
                label: "docker version",
                sublabel: "Client + Server 블록 확인",
                icon: "terminal",
              },
              {
                label: "docker run hello-world",
                sublabel: "\"Hello from Docker!\"",
                icon: "rocket",
              },
            ],
            caption: "Server 블록이 보이는 순간부터 여러분의 컴퓨터는 컨테이너를 돌릴 준비가 된 것입니다.",
          },
          demo: {
            title: "터미널에서 설치 확인 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "터미널 — Docker 설치 확인",
              files: [
                { id: "f-check", name: "설치-체크리스트.md", active: true },
                { id: "f-notes", name: "메모.md" },
              ],
              code: [
                { id: "c-title", text: "# Docker 설치 체크리스트" },
                { id: "c-1", text: "- [x] 라이선스 확인 (개인 학습용 → 무료)" },
                { id: "c-2", text: "- [x] Docker Desktop 설치 후 약관 동의" },
                { id: "c-3", text: "- [ ] docker version 으로 Client·Server 확인", tone: "comment" },
                { id: "c-4", text: "- [ ] docker run hello-world 로 첫 컨테이너 실행", tone: "comment" },
                { id: "c-5", text: "- [x] docker version 으로 Client·Server 확인", tone: "add", hidden: true },
                { id: "c-6", text: "- [x] docker run hello-world 로 첫 컨테이너 실행", tone: "add", hidden: true },
              ],
              terminal: [
                { id: "t-1", text: "docker version", tone: "cmd", hidden: true },
                { id: "t-2", text: "Client:", tone: "out", hidden: true },
                { id: "t-3", text: " Version:           29.8.0   OS/Arch: darwin/arm64", tone: "out", hidden: true },
                { id: "t-5", text: "Server: Docker Desktop", tone: "out", hidden: true },
                { id: "t-7", text: " Engine:  Version: 29.8.0", tone: "ok", hidden: true },
                { id: "t-8", text: "docker run hello-world", tone: "cmd", hidden: true },
                { id: "t-9", text: "Unable to find image 'hello-world:latest' locally", tone: "out", hidden: true },
                { id: "t-11", text: "Status: Downloaded newer image for hello-world:latest", tone: "out", hidden: true },
                { id: "t-12", text: "Hello from Docker!", tone: "ok", hidden: true },
                { id: "t-13", text: "This message shows that your installation appears to be working correctly.", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 먼저 클라이언트와 데몬이 모두 살아 있는지 확인합니다" },
              { t: "type", target: "t-1", text: "docker version" },
              { t: "reveal", target: "t-2" },
              { t: "reveal", target: "t-3" },
              { t: "caption", text: "② Server 블록이 보이면 데몬이 켜진 것입니다" },
              { t: "reveal", target: "t-5" },
              { t: "reveal", target: "t-7" },
              { t: "move", target: "t-7" },
              { t: "caption", text: "③ 첫 컨테이너 — 이미지가 없으면 자동으로 내려받습니다" },
              { t: "type", target: "t-8", text: "docker run hello-world" },
              { t: "reveal", target: "t-9" },
              { t: "reveal", target: "t-11" },
              { t: "caption", text: "④ 컨테이너가 실행되어 인사말을 출력합니다" },
              { t: "reveal", target: "t-12" },
              { t: "reveal", target: "t-13" },
              { t: "move", target: "t-12" },
              { t: "caption", text: "⑤ 체크리스트를 완료 표시합니다" },
              { t: "move", target: "c-3" },
              { t: "click" },
              { t: "hide", target: "c-3" },
              { t: "hide", target: "c-4" },
              { t: "type", target: "c-5", text: "- [x] docker version 으로 Client·Server 확인" },
              { t: "type", target: "c-6", text: "- [x] docker run hello-world 로 첫 컨테이너 실행" },
              { t: "caption", text: "✅ 설치 완료 — 이제 컨테이너를 띄울 준비가 되었습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "images-and-containers",
      title: "이미지와 컨테이너 다루기",
      description: "docker run 해부, 레이어, 생명주기, 포트·환경변수·Docker 볼륨",
      lessons: [
        {
          slug: "first-run",
          title: "첫 컨테이너 실행: docker run 한 줄 해부",
          minutes: 6,
          content: `앞으로 여러분이 가장 많이 칠 명령은 \`docker run\`입니다. 이 한 줄을 **주문서** 읽듯 해부하면 Docker의 절반은 끝납니다.

## 명령의 뼈대

\`\`\`bash
docker run [옵션] 이미지[:태그] [컨테이너 안에서 실행할 명령]
\`\`\`

\`docker run\`은 사실 세 가지 일을 한 번에 합니다. 이미지가 없으면 **내려받고(pull)**, 컨테이너를 **만들고(create)**, **시작(start)**합니다.

## 자주 쓰는 옵션 7개

- \`-d\` — 백그라운드로 실행(detach). 터미널을 점유하지 않습니다. 웹 서버·DB는 거의 항상 \`-d\`.
- \`-p 8080:80\` — 포트 매핑. **내 컴퓨터 8080 → 컨테이너 80**. 순서를 기억하세요: 바깥:안.
- \`-e KEY=value\` — 환경변수 주입. 비밀번호·모드 설정 등.
- \`-v 이름:/경로\` — Docker 볼륨 연결. 데이터를 컨테이너 밖에 보존.
- \`--name web\` — 컨테이너에 이름 붙이기. 안 붙이면 \`sleepy_einstein\` 같은 랜덤 이름이 붙습니다.
- \`--rm\` — 컨테이너가 멈추면 자동 삭제. 일회성 실험에 유용.
- \`-it\` — 대화형 터미널(\`-i\` 입력 유지 + \`-t\` 터미널 할당). 컨테이너 안에 "들어가서" 셸을 쓸 때.

## 직접 해 보기

\`\`\`bash
docker run --rm -it alpine sh    # 초경량 리눅스에 들어가 봅니다
cat /etc/os-release              # 컨테이너 안: Alpine Linux가 보임
exit                             # 나오면 --rm 덕분에 컨테이너가 사라짐
\`\`\`

\`alpine\`은 몇 MB짜리 초경량 이미지입니다. 첫 실행만 내려받느라 몇 초 걸립니다.

**여기서 막힌다면**

- **명령이 끝났는데 컨테이너가 계속 목록에 남는다** → \`--rm\`을 안 붙였습니다. \`docker ps -a\`로 확인하고 \`docker rm 이름\`으로 지우세요.
- **\`-p 80:80\`이 \`permission denied\` 또는 이미 사용 중이라 실패** → 1024 미만 포트는 권한이 필요하거나 이미 쓰는 중일 수 있습니다. \`-p 8080:80\`처럼 높은 번호로.

> 💡 **핵심**: \`docker run\` = pull + create + start. 옵션은 **\`-d -p -e -v --name --rm -it\`** 7개만 알면 입문 단계 명령의 90%를 읽을 수 있습니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "docker run — 첫 컨테이너",
            lines: [
              { text: "docker run --rm -it alpine sh", tone: "cmd" },
              { text: "Unable to find image 'alpine:latest' locally", tone: "dim" },
              { text: "latest: Pulling from library/alpine", tone: "dim" },
              { text: "Status: Downloaded newer image for alpine:latest", tone: "out" },
              { text: "/ # cat /etc/os-release", tone: "cmd" },
              { text: "NAME=\"Alpine Linux\"", tone: "ok" },
              { text: "ID=alpine", tone: "out" },
              { text: "/ # exit", tone: "cmd" },
              { text: "# --rm 덕분에 컨테이너는 자동 삭제됨", tone: "comment" },
              { text: "docker ps -a", tone: "cmd" },
              { text: "CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES", tone: "dim" },
            ],
            caption: "프롬프트가 '/ #'로 바뀌는 순간, 여러분은 내 컴퓨터가 아닌 컨테이너 안에 있습니다.",
          },
        },
        {
          slug: "images-and-layers",
          title: "이미지와 레이어: 왜 두 번째 pull은 빠른가",
          minutes: 5,
          content: `1GB짜리 이미지를 내려받았는데, 비슷한 다른 이미지는 몇 초 만에 끝납니다. 비밀은 이미지가 **한 덩어리가 아니라 층(레이어)으로 쌓여 있다**는 데 있습니다.

## 이미지와 컨테이너의 관계

- **이미지**: 읽기 전용 설계도. 한 번 만들면 바뀌지 않습니다.
- **컨테이너**: 그 설계도로 찍어낸 **실행 중인 인스턴스**. 하나의 이미지로 컨테이너를 100개 만들 수 있습니다.

클래스와 객체, 붕어빵 틀과 붕어빵 — 어느 비유든 좋습니다.

## 이미지는 층으로 쌓인다

이미지 레이어는 **투명 OHP 필름**을 겹쳐 놓은 것과 같습니다. 맨 아래 필름에 운영체제 파일, 그 위 필름에 Node 런타임, 그 위에 내 앱 코드. 위에서 내려다보면 하나의 그림(파일 시스템)으로 보입니다.

- 각 층은 읽기 전용이고, 내용의 해시값으로 식별됩니다.
- **같은 층은 한 번만 저장**합니다. \`node:24-alpine\`을 쓰는 이미지가 10개라도 Node 층은 디스크에 하나뿐입니다.
- 그래서 \`docker pull\` 출력에 \`Already exists\`(이미 있음)와 \`Pull complete\`(새로 받음)가 섞여 나옵니다.

## 컨테이너가 쓰는 마지막 한 장

컨테이너를 시작하면 Docker가 이미지 위에 **쓰기 가능한 얇은 층**을 한 장 더 올립니다. 컨테이너 안에서 파일을 만들거나 고치면 이 층에만 기록됩니다. 그래서 컨테이너를 지우면 그 변경은 사라지고, 이미지는 그대로입니다. 데이터를 남기려면 다음 다음 레슨의 Docker 볼륨이 필요합니다.

**직접 확인해 보기**

\`\`\`bash
docker image ls                  # REPOSITORY  TAG  IMAGE ID  CREATED  SIZE
docker image history alpine      # 층이 어떤 명령으로 만들어졌는지
\`\`\`

> 💡 **핵심**: 이미지 = 읽기 전용 층들의 겹침, 컨테이너 = 그 위에 올린 **쓰기용 한 장**. 같은 층은 한 번만 받으니 두 번째 pull이 빠릅니다.`,
          illustration: {
            type: "stack",
            title: "이미지 레이어와 컨테이너 층",
            layers: [
              {
                label: "컨테이너 쓰기 층 (읽기·쓰기)",
                sublabel: "실행 중 생긴 변경 — 컨테이너 삭제 시 사라짐",
                icon: "file-pen",
                tone: "warning",
              },
              {
                label: "내 앱 코드 층",
                sublabel: "COPY . .  — 자주 바뀜",
                icon: "code",
                tone: "primary",
              },
              {
                label: "의존성 층",
                sublabel: "RUN npm install — 가끔 바뀜",
                icon: "package",
                tone: "accent",
              },
              {
                label: "베이스 이미지 층",
                sublabel: "node:24-alpine — 거의 안 바뀜, 여러 이미지가 공유",
                icon: "layers",
                tone: "muted",
              },
            ],
            caption: "아래 층은 공유되고 위 층만 바뀝니다 — 그래서 저장 공간도, 내려받는 시간도 아낍니다.",
          },
        },
        {
          slug: "container-lifecycle",
          title: "컨테이너 생명주기: ps·stop·rm·logs·exec",
          minutes: 7,
          content: `컨테이너는 켜고 끄고 지우는 물건입니다. 카페처럼 **개점 → 영업 → 마감 → 폐점** 흐름이 있고, 단계마다 명령이 붙습니다.

## 상태와 명령

- **Created** — \`docker create\`로 만들었지만 아직 시작 안 함(\`run\`은 자동 통과)
- **Up(Running)** — \`docker run\` / \`docker start\`로 실행 중
- **Exited** — \`docker stop\`으로 멈춤. 파일·설정은 남아 \`docker start 이름\`으로 되살림
- **삭제** — \`docker rm 이름\`. 쓰기 층도 함께 사라짐

\`docker stop\`은 정리 신호(SIGTERM)를 보내고 **10초** 안에 안 끝나면 강제 종료(SIGKILL)합니다. 실행 중인 컨테이너는 \`rm\`이 거부되니 \`stop\` 후 \`rm\`, 급하면 \`docker rm -f\`.

## 들여다보는 명령 세 가지

- \`docker ps\` — 실행 중 목록. \`-a\`는 멈춘 것까지. 컬럼은 CONTAINER ID · IMAGE · COMMAND · CREATED · STATUS · PORTS · NAMES.
- \`docker logs web\` — 표준 출력. \`-f\`로 실시간, \`--tail 50\`으로 마지막 50줄.
- \`docker exec -it web sh\` — 컨테이너 **안에서** 셸 실행. 안을 직접 확인할 때.

## 따라 하기

\`\`\`bash
docker run -d -p 8080:80 --name web nginx   # 웹 서버 개점
docker ps                                   # STATUS: Up ...
docker logs --tail 5 web                    # 시작 로그 확인
docker exec -it web sh                      # 안으로 들어가기 → exit로 나옴
docker stop web && docker rm web            # 마감 후 폐점
\`\`\`

\`http://localhost:8080\`을 열면 "Welcome to nginx!"가 보입니다.

**여기서 막힌다면**

- **\`Conflict. The container name "/web" is already in use\`** → 같은 이름이 이미 있습니다. \`docker rm -f web\` 또는 다른 이름.
- **\`docker exec\`에서 \`bash\`가 없다고 나옴** → Alpine 계열은 bash가 없습니다. \`sh\`를 쓰세요.

> 💡 **핵심**: 컨테이너 문제의 첫 진단 세트는 \`ps\`(살아 있나) → \`logs\`(뭐라고 말하나) → \`exec\`(안에 들어가 보기) 순서입니다.`,
          illustration: {
            type: "cycle",
            title: "컨테이너 생명주기",
            center: "docker ps 로 현재 상태 확인",
            nodes: [
              { label: "Created", sublabel: "docker create / run", icon: "package" },
              { label: "Up (실행 중)", sublabel: "docker start · logs · exec", icon: "play" },
              { label: "Exited (멈춤)", sublabel: "docker stop (SIGTERM → 10초 → SIGKILL)", icon: "clock" },
              { label: "삭제됨", sublabel: "docker rm (쓰기 층 소멸)", icon: "x" },
            ],
            caption: "Exited에서 start로 되살릴 수 있지만, rm 이후에는 이미지에서 새로 만드는 것뿐입니다.",
          },
          demo: {
            title: "터미널에서 nginx 컨테이너 생명주기 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "터미널 — nginx 컨테이너 다루기",
              files: [
                { id: "f-cheat", name: "명령어-치트시트.md", active: true },
                { id: "f-notes", name: "메모.md" },
              ],
              code: [
                { id: "c-title", text: "# 컨테이너 생명주기 치트시트" },
                { id: "c-1", text: "run -d   → 백그라운드 실행 (개점)" },
                { id: "c-2", text: "ps       → 실행 중 목록 확인" },
                { id: "c-3", text: "logs     → 컨테이너가 남긴 출력 보기" },
                { id: "c-4", text: "exec -it → 안에 들어가 셸 실행" },
                { id: "c-5", text: "stop     → SIGTERM 후 10초 뒤 SIGKILL (마감)" },
                { id: "c-6", text: "rm       → 컨테이너 삭제 (폐점)" },
              ],
              terminal: [
                { id: "t-1", text: "docker run -dp 8080:80 --name web nginx", tone: "cmd", hidden: true },
                { id: "t-2", text: "3f9c1a7e2b4d5c6f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f", tone: "out", hidden: true },
                { id: "t-3", text: "docker ps", tone: "cmd", hidden: true },
                { id: "t-4", text: "CONTAINER ID   IMAGE   COMMAND                  STATUS         PORTS                  NAMES", tone: "out", hidden: true },
                { id: "t-5", text: "3f9c1a7e2b4d   nginx   \"/docker-entrypoint.…\"   Up 5 seconds   0.0.0.0:8080->80/tcp   web", tone: "ok", hidden: true },
                { id: "t-6", text: "docker logs --tail 1 web", tone: "cmd", hidden: true },
                { id: "t-7", text: "/docker-entrypoint.sh: Configuration complete; ready for start up", tone: "out", hidden: true },
                { id: "t-9", text: "docker exec -it web sh", tone: "cmd", hidden: true },
                { id: "t-10", text: "# ls /usr/share/nginx/html", tone: "cmd", hidden: true },
                { id: "t-11", text: "50x.html  index.html", tone: "out", hidden: true },
                { id: "t-12", text: "# exit", tone: "cmd", hidden: true },
                { id: "t-13", text: "docker stop web", tone: "cmd", hidden: true },
                { id: "t-14", text: "web", tone: "out", hidden: true },
                { id: "t-15", text: "docker rm web", tone: "cmd", hidden: true },
                { id: "t-16", text: "web", tone: "out", hidden: true },
                { id: "t-17", text: "docker ps -a", tone: "cmd", hidden: true },
                { id: "t-18", text: "CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 웹 서버를 백그라운드로 띄우고 8080 포트를 연결합니다 (-dp = -d -p)" },
              { t: "type", target: "t-1", text: "docker run -dp 8080:80 --name web nginx" },
              { t: "reveal", target: "t-2" },
              { t: "caption", text: "② ps로 STATUS가 Up인지, 포트가 연결됐는지 확인합니다" },
              { t: "type", target: "t-3", text: "docker ps" },
              { t: "reveal", target: "t-4" },
              { t: "reveal", target: "t-5" },
              { t: "caption", text: "③ logs로 컨테이너가 남긴 마지막 출력을 봅니다" },
              { t: "type", target: "t-6", text: "docker logs --tail 1 web" },
              { t: "reveal", target: "t-7" },
              { t: "caption", text: "④ exec로 컨테이너 안에 들어가 파일을 직접 확인합니다" },
              { t: "type", target: "t-9", text: "docker exec -it web sh" },
              { t: "type", target: "t-10", text: "# ls /usr/share/nginx/html" },
              { t: "reveal", target: "t-11" },
              { t: "type", target: "t-12", text: "# exit" },
              { t: "caption", text: "⑤ stop → rm 순서로 정리합니다" },
              { t: "type", target: "t-13", text: "docker stop web" },
              { t: "reveal", target: "t-14" },
              { t: "type", target: "t-15", text: "docker rm web" },
              { t: "reveal", target: "t-16" },
              { t: "type", target: "t-17", text: "docker ps -a" },
              { t: "reveal", target: "t-18" },
              { t: "move", target: "t-18" },
              { t: "caption", text: "✅ 개점부터 폐점까지 — 컨테이너 생명주기 한 바퀴 완료" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "ports-and-env",
          title: "포트 매핑과 환경변수: 바깥 세상과 연결하기",
          minutes: 5,
          content: `컨테이너는 기본적으로 **닫힌 방**입니다. 안에서 웹 서버가 돌아도 밖에서는 안 보입니다. 문을 내는 것이 포트 매핑, 쪽지를 넣는 것이 환경변수입니다.

## 포트 매핑: 대표번호와 내선번호

회사 대표번호(내 컴퓨터 포트)로 걸면 내선번호(컨테이너 포트)로 연결되는 것과 같습니다.

\`\`\`bash
docker run -d -p 8080:80 nginx      # 내 컴퓨터 8080 → 컨테이너 80
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secret postgres:17
\`\`\`

- 순서는 **항상 바깥:안**. \`-p 8080:80\` = 내 8080번 문을 컨테이너 80번 문에 연결.
- 안쪽 포트는 프로그램이 정하고(nginx 80, PostgreSQL 5432), 바깥 포트는 자유롭게.
- 같은 이미지 두 개는 바깥 포트만 다르게: \`-p 8080:80\`, \`-p 8081:80\`.
- \`docker ps\`의 PORTS 컬럼 \`0.0.0.0:8080->80/tcp\`가 연결 상태입니다.

Dockerfile의 \`EXPOSE 80\`은 **안내문일 뿐**, 문은 \`-p\`가 엽니다.

## 환경변수: 방 안에 넣는 쪽지

같은 이미지를 개발·운영에서 다르게 동작시키려면 설정값을 밖에서 넣습니다.

- \`-e POSTGRES_PASSWORD=secret\` — postgres 이미지는 이 값이 **없으면 시작을 거부**합니다.
- \`-e NODE_ENV=production\` — 앱이 운영 모드로 동작.
- 여러 개면 \`-e\` 반복, 많으면 \`--env-file .env\`.

\`docker exec web env\`로 실제 값을 확인합니다.

**여기서 막힌다면**

- **\`Bind for 0.0.0.0:8080 failed: port is already allocated\`** → 8080이 사용 중입니다. \`docker ps\`로 찾아 멈추거나 \`-p 8081:80\`으로.
- **localhost:80으로 열었는데 안 나옴** → \`-p 8080:80\`이면 주소는 \`localhost:8080\`입니다.
- **postgres 컨테이너가 바로 죽음** → \`docker logs\`에 "Database is uninitialized and superuser password is not specified"가 있으면 \`-e POSTGRES_PASSWORD\` 누락.

> 💡 **핵심**: \`-p 바깥:안\`으로 문을 열고, \`-e KEY=값\`으로 설정을 넣습니다. \`EXPOSE\`는 문을 열지 않는다는 점을 기억하세요.`,
          illustration: {
            type: "flow",
            title: "브라우저 요청이 컨테이너에 닿는 길",
            nodes: [
              {
                label: "브라우저",
                sublabel: "http://localhost:8080",
                icon: "globe",
                tone: "primary",
              },
              {
                label: "내 컴퓨터의 8080 포트",
                sublabel: "-p 8080:80 의 '바깥' 쪽",
                icon: "monitor",
                tone: "accent",
                edgeLabel: "요청",
              },
              {
                label: "컨테이너의 80 포트",
                sublabel: "-p 8080:80 의 '안' 쪽",
                icon: "container",
                tone: "accent",
                edgeLabel: "포트 매핑",
              },
              {
                label: "nginx 프로세스",
                sublabel: "환경변수(-e)로 동작 방식 결정",
                icon: "server",
                tone: "success",
                edgeLabel: "EXPOSE 80 은 안내문일 뿐",
              },
            ],
            caption: "바깥 포트는 내가 정하고, 안쪽 포트는 프로그램이 정합니다 — 둘을 잇는 것이 -p 입니다.",
          },
        },
        {
          slug: "volumes",
          title: "Docker 볼륨: 컨테이너가 사라져도 데이터는 남기기",
          minutes: 5,
          content: `데이터베이스 컨테이너를 \`rm\`하고 다시 띄웠는데 **데이터가 몽땅 사라졌다** — 입문자가 가장 크게 놀라는 순간입니다. 쓰기 층은 컨테이너와 함께 사라지기 때문입니다.

## 호텔 방과 보관소

컨테이너는 **호텔 방**입니다. 체크아웃(rm)하면 방은 원래대로 정리됩니다. 짐을 남기려면 방 밖의 **보관소**에 맡겨야 하죠. Docker 볼륨이 그 보관소입니다. Docker가 호스트에 만들어 관리하고, 컨테이너를 지워도 남습니다.

## 볼륨 쓰는 법

\`\`\`bash
docker volume create pgdata
docker run -d --name db -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data postgres:17
docker rm -f db          # 컨테이너를 지워도…
docker run -d --name db -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data postgres:17   # 데이터가 그대로!
\`\`\`

- \`-v 볼륨이름:/컨테이너/경로\` — 이름 있는 볼륨을 컨테이너 안 경로에 연결. 없으면 자동 생성.
- 붙일 경로는 이미지 문서가 알려 줍니다. postgres 17 이하는 \`/var/lib/postgresql/data\`, 18 이상은 \`/var/lib/postgresql\`로 바뀌었으니 Docker Hub 설명을 확인하세요.
- \`docker volume ls\` / \`inspect\` / \`rm\`, 안 쓰는 것 일괄 정리는 \`docker volume prune\`.

## 바인드 마운트와의 차이

\`-v /Users/me/site:/usr/share/nginx/html\`처럼 **내 컴퓨터의 실제 폴더**를 연결하는 것은 바인드 마운트입니다. 코드 수정이 즉시 반영돼 개발에 편합니다. Docker 볼륨은 Docker가 위치를 관리해 이식성이 좋고 DB 파일에 적합합니다. **개발 중 소스 코드 → 바인드 마운트, 잃으면 안 되는 데이터 → Docker 볼륨**.

**여기서 막힌다면**

- **볼륨을 붙였는데도 데이터가 사라짐** → 이미지가 기대하는 경로와 다릅니다. \`docker inspect db\`의 Mounts 항목을 이미지 문서와 비교.
- **\`docker rm -v db\`를 쳤더니 DB가 비었다** → 여기서 \`-v\`는 볼륨까지 삭제하는 옵션입니다. 데이터를 남기려면 \`-v\` 없이.

> 💡 **핵심**: 컨테이너는 **일회용**, 데이터는 **Docker 볼륨**에. 첫 등장 시 반드시 "어느 경로에 붙이는가"를 이미지 문서에서 확인하세요.`,
          illustration: {
            type: "compare",
            title: "볼륨 없이 vs Docker 볼륨과 함께",
            columns: [
              {
                title: "볼륨 없이",
                icon: "alert",
                tone: "warning",
                items: [
                  "데이터가 컨테이너 쓰기 층에만 존재",
                  "docker rm → 데이터 소멸",
                  "이미지 업데이트마다 초기화",
                  "실험용·일회성 작업에만 적합",
                ],
              },
              {
                title: "Docker 볼륨 (-v pgdata:/경로)",
                icon: "hard-drive",
                tone: "primary",
                items: [
                  "데이터가 Docker 관리 영역에 별도 저장",
                  "docker rm 후에도 볼륨은 유지",
                  "새 컨테이너가 같은 볼륨을 이어받음",
                  "데이터베이스·업로드 파일에 적합",
                ],
              },
              {
                title: "바인드 마운트 (-v ./폴더:/경로)",
                icon: "link",
                tone: "accent",
                items: [
                  "내 컴퓨터의 실제 폴더를 그대로 연결",
                  "코드 수정이 즉시 반영",
                  "위치가 컴퓨터마다 달라 이식성 낮음",
                  "개발 중 소스 코드에 적합",
                ],
              },
            ],
            caption: "컨테이너는 바꿔 끼우는 부품, 볼륨은 남아야 하는 기억입니다.",
          },
        },
      ],
    },
    {
      slug: "build-your-image",
      title: "나만의 이미지 만들기",
      description: "Dockerfile 작성, 빌드와 이미지 태그, .dockerignore와 캐시",
      lessons: [
        {
          slug: "dockerfile-basics",
          title: "Dockerfile 첫걸음: FROM·COPY·RUN·CMD",
          minutes: 7,
          content: `지금까지는 남이 만든 이미지를 썼습니다. 이제 **내 앱을 이미지로** 만들 차례입니다. 필요한 것은 Dockerfile 텍스트 파일 하나.

## 가구 조립 설명서처럼

Dockerfile은 위에서 아래로 읽는 **조립 설명서**입니다. "이 부품(베이스 이미지)에서 시작해, 파일을 넣고, 명령을 실행하고, 이렇게 켜라." 명령 하나가 레이어 하나입니다.

\`\`\`dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

- \`FROM\` — 베이스 이미지. 반드시 첫 줄. 태그(\`:24-alpine\`)를 꼭 적으세요.
- \`WORKDIR\` — 이후 명령이 실행될 폴더. 없으면 자동 생성.
- \`COPY 원본 대상\` — 빌드 컨텍스트의 파일을 이미지 안으로 복사.
- \`RUN\` — 이미지를 **만드는 동안** 실행할 명령. 결과가 층으로 저장됨.
- \`CMD\` — 컨테이너가 **시작될 때** 실행할 명령. 하나만.

\`CMD\`는 \`["node", "server.js"]\`처럼 **대괄호 배열(exec 형식)**이 권장입니다. 셸을 거치지 않아 종료 신호(SIGTERM)가 바로 전달됩니다.

## 빌드하고 실행하기

\`\`\`bash
docker build -t hello-web:1.0 .        # 마지막 '.'이 빌드 컨텍스트(현재 폴더)
docker run --rm -p 3000:3000 hello-web:1.0
\`\`\`

\`-t\`는 이름:태그를 붙이는 옵션입니다. 출력 마지막에 \`naming to docker.io/library/hello-web:1.0\`이 보이면 성공입니다.

**여기서 막힌다면**

- **\`failed to solve: ... "/package.json": not found\`** → Dockerfile 폴더가 아닌 곳에서 빌드했거나 마지막 \`.\`을 빠뜨림.
- **\`docker run\` 직후 컨테이너가 바로 종료됨** → \`CMD\`의 프로그램이 곧바로 끝난 것. \`docker logs\`로 확인.
- **\`COPY ../상위폴더\`가 \`"/파일명": not found\`** → 컨텍스트(\`.\`) 바깥 파일은 데몬에 전달되지 않습니다. 파일을 안으로 옮기거나 상위 폴더에서 \`docker build -f 하위폴더/Dockerfile .\`로 빌드.

> 💡 **핵심**: \`RUN\`은 **만들 때**, \`CMD\`는 **켤 때**. 이 둘의 차이만 정확히 알면 Dockerfile의 절반은 읽을 수 있습니다.`,
          illustration: {
            type: "steps",
            title: "Dockerfile 명령이 실행되는 순서",
            steps: [
              { label: "FROM node:24-alpine", sublabel: "베이스 이미지에서 출발", icon: "layers" },
              { label: "WORKDIR /app", sublabel: "작업 폴더 지정(자동 생성)", icon: "file-text" },
              { label: "COPY + RUN npm install", sublabel: "의존성 설치 — 빌드 때 한 번", icon: "package" },
              { label: "COPY . .", sublabel: "내 소스 코드 복사", icon: "code" },
              { label: "CMD [\"node\", \"server.js\"]", sublabel: "컨테이너가 켜질 때 실행", icon: "play" },
            ],
            caption: "위 네 단계는 빌드 시 한 번, 마지막 CMD만 컨테이너를 켤 때마다 실행됩니다.",
          },
          demo: {
            title: "Dockerfile 작성 → 빌드 → 실행 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "Dockerfile — hello-web",
              files: [
                { id: "f-docker", name: "Dockerfile", active: true },
                { id: "f-server", name: "server.js" },
                { id: "f-pkg", name: "package.json" },
              ],
              code: [
                { id: "c-1", text: "# 베이스 이미지: Node 24 LTS (Alpine)", tone: "comment" },
                { id: "c-2", text: "FROM node:24-alpine", tone: "add", hidden: true },
                { id: "c-3", text: "WORKDIR /app", tone: "add", hidden: true },
                { id: "c-4", text: "COPY package*.json ./", tone: "add", hidden: true },
                { id: "c-5", text: "RUN npm install", tone: "add", hidden: true },
                { id: "c-6", text: "COPY . .", tone: "add", hidden: true },
                { id: "c-7", text: "EXPOSE 3000", tone: "add", hidden: true },
                { id: "c-8", text: "CMD [\"node\", \"server.js\"]", tone: "add", hidden: true },
              ],
              terminal: [
                { id: "t-1", text: "docker build -t hello-web:1.0 .", tone: "cmd", hidden: true },
                { id: "t-2", text: "[+] Building 14.2s (10/10) FINISHED", tone: "out", hidden: true },
                { id: "t-3", text: " => [1/5] FROM docker.io/library/node:24-alpine", tone: "out", hidden: true },
                { id: "t-5", text: " => [5/5] COPY . .", tone: "out", hidden: true },
                { id: "t-6", text: " => => naming to docker.io/library/hello-web:1.0", tone: "ok", hidden: true },
                { id: "t-7", text: "docker run -dp 3000:3000 hello-web:1.0", tone: "cmd", hidden: true },
                { id: "t-8", text: "a1b2c3d4e5f60718293a4b5c6d7e8f9012345678abcdef0123456789abcdef01", tone: "out", hidden: true },
                { id: "t-9", text: "curl localhost:3000", tone: "cmd", hidden: true },
                { id: "t-10", text: "Hello from my first image!", tone: "ok", hidden: true },
                { id: "t-11", text: "docker stop a1b2c3d4e5f6", tone: "cmd", hidden: true },
                { id: "t-12", text: "a1b2c3d4e5f6", tone: "out", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 베이스 이미지와 작업 폴더를 정합니다" },
              { t: "type", target: "c-2", text: "FROM node:24-alpine" },
              { t: "type", target: "c-3", text: "WORKDIR /app" },
              { t: "caption", text: "② 의존성 파일을 먼저 복사하고 설치합니다 (캐시에 유리)" },
              { t: "type", target: "c-4", text: "COPY package*.json ./" },
              { t: "type", target: "c-5", text: "RUN npm install" },
              { t: "caption", text: "③ 소스를 복사하고, 켤 때 실행할 명령을 exec 형식으로 적습니다" },
              { t: "type", target: "c-6", text: "COPY . ." },
              { t: "type", target: "c-7", text: "EXPOSE 3000" },
              { t: "type", target: "c-8", text: "CMD [\"node\", \"server.js\"]" },
              { t: "caption", text: "④ 빌드 — 마지막 '.'은 현재 폴더를 컨텍스트로 보낸다는 뜻" },
              { t: "type", target: "t-1", text: "docker build -t hello-web:1.0 ." },
              { t: "reveal", target: "t-2" },
              { t: "reveal", target: "t-3" },
              { t: "reveal", target: "t-5" },
              { t: "reveal", target: "t-6" },
              { t: "caption", text: "⑤ 방금 만든 이미지로 컨테이너를 띄우고 응답을 확인합니다 (ID 앞 12자리로 제어)" },
              { t: "type", target: "t-7", text: "docker run -dp 3000:3000 hello-web:1.0" },
              { t: "reveal", target: "t-8" },
              { t: "type", target: "t-9", text: "curl localhost:3000" },
              { t: "reveal", target: "t-10" },
              { t: "move", target: "t-10" },
              { t: "type", target: "t-11", text: "docker stop a1b2c3d4e5f6" },
              { t: "reveal", target: "t-12" },
              { t: "caption", text: "✅ 내 앱이 이미지가 되어 어디서든 같은 방식으로 실행됩니다" },
            ],
          },
        },
        {
          slug: "build-and-tag",
          title: "빌드와 태그: 이미지 이름 규칙과 latest의 함정",
          minutes: 5,
          content: `\`nginx\`, \`node:24-alpine\`, \`ghcr.io/my-org/api:2.1.0\` — 모두 이미지 이름이지만 길이가 제각각입니다. 규칙 하나를 알면 전부 같은 구조로 읽힙니다.

## 이미지 이름의 네 부분

\`\`\`text
[레지스트리주소[:포트]/]네임스페이스/저장소[:태그]
ghcr.io/my-org/api:2.1.0
docker.io/library/nginx:latest   ← 'nginx' 를 풀어 쓴 것
\`\`\`

- **레지스트리 주소** — 생략하면 \`docker.io\`(Docker Hub).
- **네임스페이스** — 사용자·조직 이름. Docker Hub에서 생략하면 \`library\`(공식 이미지 공간).
- **저장소(repository)** — 이미지 이름. 필수.
- **이미지 태그** — 콜론 뒤 버전 표시. 생략하면 \`latest\`.

그래서 \`nginx\`는 \`docker.io/library/nginx:latest\`의 약자입니다. 책으로 비유하면 태그는 **판(edition)**입니다. 같은 제목이라도 1판과 3판은 내용이 다릅니다.

## 태그 붙이기와 바꾸기

\`\`\`bash
docker build -t hello-web:1.0 .                  # 빌드하면서 이름:태그
docker tag hello-web:1.0 hello-web:latest        # 같은 이미지에 별명 추가
docker tag hello-web:1.0 ghcr.io/me/hello-web:1.0  # 올릴 레지스트리 주소 포함
\`\`\`

\`docker tag\`는 복사가 아니라 **같은 이미지 ID에 이름표를 하나 더** 붙이는 것입니다. \`docker image ls\`에서 IMAGE ID가 같습니다.

## latest의 함정

- \`latest\`는 "가장 최신"이 아니라 **태그 이름이 그냥 latest**인 것입니다. 아무도 갱신하지 않으면 3년 전 이미지가 latest일 수 있습니다.
- 내용이 바뀌는 태그는 어제 되던 빌드를 오늘 깨뜨립니다. 운영에서는 \`node:24-alpine\`처럼 **버전이 드러나는 태그**를 쓰세요.
- 완전히 고정하려면 \`nginx@sha256:...\` 다이제스트(내용 해시)를 씁니다. 대신 보안 패치도 자동으로 안 들어오니 의식적으로 갱신하세요.

**여기서 막힌다면**

- **\`docker image ls\`에 \`<none>\`이 잔뜩 보임** → 같은 태그로 다시 빌드하면 이전 이미지가 이름표를 잃고 \`<none>\`(dangling)이 됩니다. \`docker image prune\`으로 정리.
- **\`invalid reference format: repository name must be lowercase\`** → 이름에 대문자가 있습니다. 전부 소문자로.

> 💡 **핵심**: 이름은 **레지스트리/네임스페이스/저장소:태그**. \`latest\`는 "최신"이 아니라 그냥 기본 이름표이니, 운영에서는 버전 태그를 쓰세요.`,
          illustration: {
            type: "grid",
            title: "이미지 이름을 이루는 네 조각",
            items: [
              {
                label: "레지스트리 주소",
                sublabel: "ghcr.io · 생략 시 docker.io",
                icon: "cloud",
                tone: "muted",
              },
              {
                label: "네임스페이스",
                sublabel: "my-org · 생략 시 library",
                icon: "users",
                tone: "accent",
              },
              {
                label: "저장소",
                sublabel: "api · 필수, 소문자",
                icon: "package",
                tone: "primary",
              },
              {
                label: "이미지 태그",
                sublabel: ":2.1.0 · 생략 시 latest",
                icon: "git-branch",
                tone: "warning",
              },
              {
                label: "다이제스트",
                sublabel: "@sha256:… · 내용 고정",
                icon: "lock",
                tone: "success",
              },
              {
                label: "docker tag",
                sublabel: "같은 ID에 이름표 추가",
                icon: "link",
                tone: "accent",
              },
            ],
            caption: "nginx 한 단어도 사실은 네 조각 중 세 조각이 기본값으로 채워진 이름입니다.",
          },
        },
        {
          slug: "dockerignore-and-cache",
          title: ".dockerignore와 빌드 캐시: 빠르고 가벼운 빌드",
          minutes: 5,
          content: `코드 한 줄 고쳤는데 빌드가 3분씩 걸리고, 이미지에 \`node_modules\`가 두 벌 들어 있다면 — 빌드 컨텍스트와 캐시를 놓친 것입니다.

## .dockerignore: 짐 싸기 전 "안 가져갈 목록"

\`docker build .\`의 마지막 \`.\`은 **현재 폴더 전체를 데몬에게 보낸다**는 뜻입니다(출력의 \`transferring context: 13.16MB\`가 그 크기). 이사 짐을 싸기 전 "안 가져갈 목록"을 적듯, 프로젝트 루트에 \`.dockerignore\`를 만듭니다.

\`\`\`text
node_modules
.git
*.log
.env
\`\`\`

- 문법은 \`.gitignore\`와 비슷합니다. \`#\` 주석, \`!\` 예외, \`**\` 하위 폴더 전체.
- \`node_modules\`를 빼면 \`COPY . .\`가 내 컴퓨터의(다른 OS용일 수 있는) 모듈을 덮어쓰는 사고를 막습니다.
- \`.env\`를 빼면 비밀번호가 이미지에 구워지지 않습니다.

## 빌드 캐시: 바뀌지 않은 층은 재사용

Docker는 각 명령의 결과를 층으로 저장하고 **입력이 같으면 재사용**합니다. \`CACHED [4/5] RUN npm install\`이 그 표시입니다.

규칙은 하나. **한 층이 바뀌면 그 뒤 층은 모두 다시 만들어집니다.** 그래서 순서가 중요합니다.

- 나쁜 순서: \`COPY . .\` → \`RUN npm install\` — 코드 한 줄 고치면 매번 npm install.
- 좋은 순서: \`COPY package*.json ./\` → \`RUN npm install\` → \`COPY . .\` — package.json이 그대로면 설치는 캐시.

앞 레슨의 Dockerfile이 이 순서였던 이유입니다. 자주 바뀌는 것은 **가능한 한 아래로**. 캐시를 무시하려면 \`docker build --no-cache\`.

**여기서 막힌다면**

- **빌드가 여전히 느리고 컨텍스트가 수백 MB** → \`.dockerignore\`가 컨텍스트 루트에 있는지, 파일명 앞에 점이 있는지 확인.
- **\`RUN apt-get install\`이 오래된 패키지를 설치** → 캐시가 예전 결과를 재사용 중. \`--no-cache\`로 새로 빌드.

> 💡 **핵심**: \`.dockerignore\`로 **보내는 짐을 줄이고**, Dockerfile은 **덜 바뀌는 것부터 위에** 적어 캐시를 살리세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "docker build — 두 번째 빌드",
            lines: [
              { text: "# server.js 한 줄 수정 후 재빌드", tone: "comment" },
              { text: "docker build -t hello-web:1.1 .", tone: "cmd" },
              { text: "[+] Building 1.8s (10/10) FINISHED", tone: "out" },
              { text: " => [internal] load build context", tone: "dim" },
              { text: " => => transferring context: 2.1kB", tone: "dim" },
              { text: " => CACHED [1/5] FROM docker.io/library/node:24-alpine", tone: "ok" },
              { text: " => CACHED [2/5] WORKDIR /app", tone: "ok" },
              { text: " => CACHED [3/5] COPY package*.json ./", tone: "ok" },
              { text: " => CACHED [4/5] RUN npm install", tone: "ok" },
              { text: " => [5/5] COPY . .", tone: "out" },
              { text: " => => naming to docker.io/library/hello-web:1.1", tone: "out" },
            ],
            caption: "14초짜리 빌드가 2초로 — 바뀐 층 하나만 다시 만들었기 때문입니다.",
          },
        },
      ],
    },
    {
      slug: "compose-and-share",
      title: "여러 컨테이너와 공유",
      description: "Docker Compose로 앱+DB 함께 띄우기, 레지스트리에 올리기, 에러 사전",
      lessons: [
        {
          slug: "compose-basics",
          title: "Docker Compose: 앱+DB를 파일 하나로",
          minutes: 6,
          content: `앱 컨테이너 하나, DB 하나. 매번 \`docker run\` 두 번에 옵션 열 개를 친다면 — Docker Compose가 파일 하나로 대신합니다.

## 여행 패키지 상품처럼

항공권·호텔·렌터카를 따로 예약하는 대신 **패키지 상품** 하나를 사는 것과 같습니다. \`compose.yaml\` 하나로 \`up\`이면 전부 켜지고 \`down\`이면 전부 정리됩니다.

\`\`\`yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
\`\`\`

- \`services\` 아래 이름 하나가 컨테이너 하나. \`web\`은 Dockerfile로 빌드, \`db\`는 이미지 그대로.
- \`ports\`·\`environment\`·\`volumes\`는 \`-p\`·\`-e\`·\`-v\`에 대응. 이름 있는 Docker 볼륨은 **맨 아래 \`volumes:\`에 선언 필수**.
- \`depends_on\`은 시작 순서만 정합니다(준비 완료를 기다리진 않음).
- 옛 예제의 \`version: "3"\`은 **지금은 필요 없고 경고만 출력**됩니다. 적지 마세요.

## 같은 네트워크, 이름이 곧 주소

Compose는 서비스들을 전용 네트워크에 넣고 **서비스 이름을 호스트 이름으로** 씁니다. web 안에서 DB 주소는 \`localhost\`가 아니라 **\`db:5432\`** 입니다.

**명령 다섯 개**(모두 \`docker compose\` 뒤에): \`up -d\` · \`ps\` · \`logs -f web\` · \`exec db psql -U postgres\` · \`down\`(\`-v\`는 볼륨까지 삭제). 파일명은 \`compose.yaml\`이 표준, 옛 \`docker-compose.yml\`도 인식.

**여기서 막힌다면**

- **web에서 DB 연결 실패(\`ECONNREFUSED 127.0.0.1:5432\`)** → \`localhost\` 대신 서비스 이름 \`db\`로.
- **\`the attribute version is obsolete, it will be ignored\` 경고** → 첫 줄 \`version:\`을 지우세요.
- **\`docker-compose\`(하이픈) 명령이 없음** → 현재 표준은 \`docker compose\`(공백).

> 💡 **핵심**: Compose는 \`docker run\` 옵션들을 YAML로 옮긴 것입니다. 컨테이너끼리는 **서비스 이름으로 통신**하고, \`version:\` 키는 쓰지 않습니다.`,
          illustration: {
            type: "flow",
            title: "compose.yaml 한 파일이 만드는 것",
            nodes: [
              {
                label: "compose.yaml",
                sublabel: "services · volumes 선언",
                icon: "file-text",
                tone: "primary",
              },
              {
                label: "docker compose up -d",
                sublabel: "빌드 → 네트워크 · 볼륨 생성 → 컨테이너 시작",
                icon: "terminal",
                tone: "accent",
              },
              {
                label: "web 컨테이너 (:3000)",
                sublabel: "Dockerfile로 빌드 · DB 주소는 db:5432",
                icon: "globe",
                tone: "success",
                edgeLabel: "depends_on: db",
              },
              {
                label: "db 컨테이너 + db-data 볼륨",
                sublabel: "postgres:17 · 데이터는 볼륨에 보존",
                icon: "database",
                tone: "success",
                edgeLabel: "같은 전용 네트워크",
              },
            ],
            caption: "컨테이너 둘, 네트워크 하나, 볼륨 하나 — 명령은 한 번입니다.",
          },
        },
        {
          slug: "registry-and-limits",
          title: "레지스트리에 올리기: Docker Hub·GHCR과 pull 한도",
          minutes: 5,
          content: `만든 이미지를 팀원과 서버가 쓰려면 어딘가에 **올려** 두어야 합니다. 그곳이 레지스트리, 이미지의 앱스토어입니다.

## 대표 레지스트리 둘

- **Docker Hub** — 기본 레지스트리. 공식 이미지가 있고 공개 저장소는 무료.
- **GHCR** — GitHub 계정만 있으면 바로 사용. 주소 \`ghcr.io/사용자명/이미지명\`.

## 세 단계로 올리기

\`\`\`bash
docker login ghcr.io -u 깃허브아이디          # 비밀번호 대신 PAT 입력
docker tag hello-web:1.0 ghcr.io/깃허브아이디/hello-web:1.0
docker push ghcr.io/깃허브아이디/hello-web:1.0
\`\`\`

- **로그인**: GHCR은 **개인 액세스 토큰(PAT)** 이 필요합니다. GitHub Settings → Developer settings → Personal access tokens → **Tokens (classic)** 에서 \`write:packages\` 권한으로 발급. fine-grained 토큰은 불가.
- **태그**: 레지스트리 주소와 네임스페이스를 앞에 붙임.
- **푸시**: 레이어 단위 업로드. 이미 있는 층은 \`Layer already exists\`로 건너뜀.

처음 푸시한 GHCR 패키지는 **기본 비공개**입니다(패키지 설정에서 공개 전환).

## Docker Hub pull 한도

2026년 9월 기준 Docker Hub 내려받기 한도:

- **로그인 안 함**: 6시간당 **100회**
- **무료 Personal 계정 로그인**: 6시간당 **200회**
- **유료(Pro/Team/Business)**: 무제한

함정은 IP 기준입니다. 사무실·CI처럼 한 IP를 여럿이 쓰면 내가 안 받아도 한도가 찹니다. 초과하면 \`toomanyrequests: You have reached your pull rate limit\` 에러. 해결은 \`docker login\` 또는 GHCR 등에 미러링.

**여기서 막힌다면**

- **\`denied: requested access to the resource is denied\`** → 미로그인, 또는 태그의 네임스페이스가 내 계정명과 다름.
- **\`unauthorized: authentication required\`(GHCR)** → PAT 권한(\`write:packages\`) 부족 또는 만료.

> 💡 **핵심**: **login → tag → push** 세 단계. Docker Hub는 미인증 IP당 6시간 100회 한도가 있으니, 팀·CI에서는 로그인을 습관화하세요.`,
          illustration: {
            type: "steps",
            title: "내 이미지를 레지스트리로 보내는 길",
            steps: [
              {
                label: "docker build -t hello-web:1.0 .",
                sublabel: "로컬에 이미지 생성",
                icon: "package",
              },
              {
                label: "docker login ghcr.io",
                sublabel: "GitHub PAT(write:packages)로 인증",
                icon: "key",
              },
              {
                label: "docker tag … ghcr.io/me/hello-web:1.0",
                sublabel: "레지스트리 주소 + 네임스페이스 붙이기",
                icon: "git-branch",
              },
              {
                label: "docker push ghcr.io/me/hello-web:1.0",
                sublabel: "레이어 단위 업로드",
                icon: "upload",
              },
              {
                label: "서버에서 docker pull",
                sublabel: "미인증 Docker Hub는 6시간 100회 한도",
                icon: "download",
              },
            ],
            caption: "레지스트리 주소가 포함된 태그가 있어야 push가 어디로 갈지 알 수 있습니다.",
          },
        },
        {
          slug: "troubleshooting-and-next",
          title: "막혔을 때 보는 에러 사전 + 다음 단계",
          minutes: 6,
          content: `입문자가 만나는 Docker 에러는 대체로 같은 8개입니다. 응급실이 증상별로 환자를 분류하듯, **메시지로 막힌 곳을 찾으면** 해결은 한 줄입니다.

## 증상별 처방 8가지

**데몬·권한**

- **\`Cannot connect to the Docker daemon ... Is the docker daemon running?\`** → 데몬 꺼짐. Docker Desktop을 켜세요.
- **\`permission denied ... docker.sock\`**(리눅스) → \`sudo usermod -aG docker $USER\` 후 재로그인.

**포트·이름 충돌**

- **\`Bind for 0.0.0.0:8080 failed: port is already allocated\`** → \`docker ps\`로 점유자를 찾아 \`stop\`, 또는 바깥 포트를 \`8081\`로.
- **\`Conflict. The container name "/web" is already in use\`** → 이름 중복. \`docker rm -f web\` 후 재실행.

**이미지·디스크·CPU**

- **\`pull access denied ... may require 'docker login'\`** → 이름 오타 또는 비공개 저장소. 확인 후 \`docker login\`.
- **\`toomanyrequests: You have reached your pull rate limit\`** → Docker Hub 한도 초과. \`docker login\` 후 재시도.
- **\`no space left on device\`** → \`docker system df\`로 확인 후 \`docker system prune -a\`(\`--volumes\` 없으면 Docker 볼륨은 안전).
- **\`exec format error\`** → CPU 아키텍처 불일치(arm64 Mac 이미지 → amd64 서버). \`docker build --platform linux/amd64\`로 재빌드.

## 다음 단계

- **"Docker 실전: 작고 안전한 이미지와 운영"** — 멀티스테이지 빌드, 취약점 스캔, 비루트 실행, CI/CD.
- 그 다음은 **"Kubernetes 입문: 컨테이너 오케스트레이션 첫걸음"** — 컨테이너가 수십 개일 때.

> 💡 **핵심**: 에러 메시지는 **어느 층(데몬·포트·이미지·디스크·CPU)** 이 막혔는지 알려 주는 안내판입니다. 메시지를 그대로 검색하는 습관이 가장 빠른 해결책입니다.`,
          illustration: {
            type: "chat",
            title: "에러 사전 — 증상과 처방",
            messages: [
              {
                role: "user",
                text: "Bind for 0.0.0.0:8080 failed: port is already allocated 이라고 나와요.",
              },
              {
                role: "ai",
                text: "8080 포트를 누가 이미 쓰고 있습니다. docker ps로 찾아 stop 하거나, -p 8081:80 처럼 바깥 포트를 바꾸세요.",
              },
              {
                role: "user",
                text: "리눅스 서버에서 permission denied ... docker.sock 에러가 나요.",
              },
              {
                role: "ai",
                text: "계정이 docker 그룹에 없어서입니다. sudo usermod -aG docker $USER 후 로그아웃·로그인하세요.",
              },
              {
                role: "user",
                text: "Mac에서 만든 이미지를 서버에 올렸는데 exec format error가 떠요.",
              },
              {
                role: "ai",
                text: "arm64 이미지를 amd64 서버에서 돌린 것입니다. docker build --platform linux/amd64 로 다시 빌드하세요.",
              },
              {
                role: "system",
                text: "다음 강의: Docker 실전: 작고 안전한 이미지와 운영",
              },
            ],
            caption: "메시지의 핵심 단어(port · permission · exec format)만 잡아도 처방은 거의 정해져 있습니다.",
          },
        },
      ],
    },
  ],
};
