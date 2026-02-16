# Fish Audio API Proxy

一键部署到 Vercel，代理 Fish Audio API。

## 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/fish-audio-proxy)

## 使用

部署后，将 `https://api.fish.audio` 替换为你的 Vercel 域名即可。

例如：
```bash
curl https://your-project.vercel.app/v1/tts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"你好","reference_id":"MODEL_ID"}'
```
