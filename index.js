import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# Hi there 👋

## 🚀 About Me
안녕하세요! 개발과 네트워크를 연구하는 개발자입니다.

## 🛠️ 이런 환경에 익숙해요

### 클라우드 & 컨테이너
<p>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
  <img alt="Kubernetes" src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white"/>
  <img alt="Helm" src="https://img.shields.io/badge/Helm-0F1689?style=flat-square&logo=helm&logoColor=white"/>
</p>

### 시스템 & 네트워크
<p>
  <img alt="Linux" src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black"/>
  <img alt="Cisco" src="https://img.shields.io/badge/Cisco-1BA0D7?style=flat-square&logo=cisco&logoColor=white"/>
  <img alt="IoT" src="https://img.shields.io/badge/IoT-00979D?style=flat-square&logo=internetofthings&logoColor=white"/>
</p>

## 💻 언어

<p>
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
  <img alt="C" src="https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black"/>
</p>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {
    // 피드 목록
    const feed = await parser.parseURL('https://zhuxiclover.tistory.com/rss');
    
    text += `<ul>`;
    
    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    // 게시글이 10개 미만일 경우를 대비한 안전 장치
    const postCount = Math.min(feed.items.length, 10);
    
    for (let i = 0; i < postCount; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;
    
    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();

