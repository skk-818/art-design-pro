<template>
  <div class="article-detail page-content">
    <div class="content">
      <h1>{{ articleTitle }}</h1>
      <div class="markdown-body" v-highlight v-html="articleHtml"></div>
    </div>
    <ArtBackToTop />
  </div>
</template>

<script setup lang="ts">
  import '@/assets/styles/markdown.scss'
  import '@/assets/styles/one-dark-pro.scss'
  import { useCommon } from '@/composables/useCommon'
  import axios from 'axios'
  // import 'highlight.js/styles/atom-one-dark.css';
  // import 'highlight.js/styles/vs2015.css';

  defineOptions({ name: 'ArticleDetail' })

  const articleId = ref(0)
  const router = useRoute()
  const articleTitle = ref('')
  const articleHtml = ref('')

  onMounted(() => {
    useCommon().scrollToTop()
    articleId.value = Number(router.query.id)
    getArticleDetail()
  })

  const getArticleDetail = async () => {
    if (articleId.value) {
      const res = await axios.get('https://www.qiniu.lingchen.kim/blog_detail.json')
      if (res.data.code === 200) {
        articleTitle.value = res.data.data.title
        articleHtml.value = res.data.data.html_content
      }
    }
  }
</script>

<style lang="scss">
  .article-detail {
    .content {
      max-width: 800px;
      margin: auto;
      margin-top: 60px;

      .markdown-body {
        margin-top: 60px;

        img {
          width: 100%;
          border: 1px solid var(--art-gray-200);
        }

        pre {
          position: relative;

          &:hover {
            .copy-button {
              opacity: 1;
            }
          }

          &::before {
            position: absolute;
            top: 0;
            left: 50px;
            width: 1px;
            height: 100%;
            content: '';
            background: #0a0a0e;
          }
        }

        .code-wrapper {
          overflow-x: auto;
        }

        .line-number {
          position: sticky;
          left: 0;
          z-index: 2;
          box-sizing: border-box;
          display: inline-block;
          width: 50px;
          margin-right: 10px;
          font-size: 14px;
          color: #9e9e9e;
          text-align: center;
        }

        .copy-button {
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 1;
          width: 40px;
          height: 40px;
          font-size: 20px;
          line-height: 40px;
          color: #999;
          text-align: center;
          cursor: pointer;
          background-color: #000;
          border: none;
          border-radius: 8px;
          opacity: 0;
          transition: all 0.2s;
        }
      }
    }
  }
</style>
