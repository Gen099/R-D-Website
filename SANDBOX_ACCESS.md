# 🌐 SANDBOX QUICK ACCESS

## 🎯 URL Hiện Tại (Valid ~1 giờ)

```
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai
```

## 📱 Quick Links

### Homepage & Dashboard
```
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/
```

### AI Tools (Phân tích thông minh)
```
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/ai-tools
```
**Features:**
- ✅ Gemini (Google AI) - Mặc định, miễn phí
- ✅ GLM (Zhipu AI)
- ✅ OpenAI GPT-5
- ✅ Claude (Anthropic)

**4 Loại Phân Tích:**
1. **Brief Analysis**: Phân tích yêu cầu khách hàng
2. **Error Analysis**: Phân tích lỗi và feedback
3. **Prompt Generation**: Tạo prompt tối ưu
4. **General Q&A**: Trả lời câu hỏi chung

### Analytics Dashboard
```
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/analytics
```
**Charts:**
- 📊 Pie Chart: Phân bố lỗi (35% hiểu sai, 26% AI output...)
- 📊 Bar Chart 1: Lỗi theo loại Effect
- 📊 Bar Chart 2: Thời gian xử lý trung bình
- 📊 Radar Chart: AI capability
- 📋 Data Table: 23 Job Codes

### Documents
```
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/document/analysis-report
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/document/work-plan
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/document/technical-doc
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/document/operation-doc
https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/document/platform-design
```

### API Endpoints

#### Health Check
```bash
curl https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/api/health
```

#### Get Documents
```bash
curl https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/api/documents
```

#### AI Analysis (General)
```bash
curl -X POST https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "type": "general",
    "input": "Fotober là công ty gì?",
    "config": {"provider": "gemini"}
  }'
```

#### AI Analysis (Brief)
```bash
curl -X POST https://3000-i61seqfzu0jxf414p7hph-de59bda9.sandbox.novita.ai/api/ai/brief \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Cần làm video 5s, hiệu ứng Day-to-Night, voiceover tiếng Việt",
    "config": {"provider": "gemini"}
  }'
```

## 🧪 Test Cases

### Test 1: General Q&A
**URL**: `/ai-tools`
**Provider**: Gemini
**Type**: General Q&A
**Input**:
```
Fotober là công ty gì? Có bao nhiêu nhân viên?
```

**Expected Output**:
- Fotober thành lập 2016
- 150+ nhân viên
- 10,000+ khách hàng/năm
- 20,000+ ảnh/ngày

### Test 2: Brief Analysis
**URL**: `/ai-tools`
**Provider**: Gemini
**Type**: Brief Analysis
**Input**:
```
Cần làm video cho căn biệt thự ngoại ô, 5 giây, thêm hiệu ứng Day-to-Night ở phần ngoại cảnh, có voiceover giọng nữ tiếng Việt, xuất 4K vertical cho TikTok.
```

**Expected Output**:
- Analysis text
- Effects: Day-to-Night với confidence ~0.9
- Estimated time: 3-5 giờ
- Difficulty: 3/10
- Suggestions cho workflow

### Test 3: Error Analysis
**URL**: `/ai-tools`
**Provider**: Gemini
**Type**: Error Analysis
**Input**:
```
Job HTJAN22005: order 15 hiệu ứng nhưng chỉ hoàn thành 9, trễ 9 giờ, lỗi hiểu sai yêu cầu khách hàng và AI output kém.
```

**Expected Output**:
- Errors detected với severity
- Solutions cho từng lỗi
- Suggestions để improve

### Test 4: Prompt Generation
**URL**: `/ai-tools`
**Provider**: Gemini
**Type**: Prompt Generation
**Input**:
```
Tạo prompt cho Kling AI để làm hiệu ứng Day-to-Night cho video biệt thự, cần chuyển từ ban ngày sang hoàng hôn.
```

**Expected Output**:
- Prompts cho Kling AI
- Technical parameters
- Tips cho best results

## 📊 Sample Data

**Fotober Stats:**
- 📸 Ảnh xử lý/ngày: 20,000+
- 👥 Nhân viên: 150+
- 🏢 Khách hàng/năm: 10,000+
- ⏱️ Turnaround: 12-24 giờ

**23 Job Codes:**
- TADEC31004, HTJAN15008Rev, DUJAN04005, QUJAN25001...

**25+ AI Effects:**
- Day-to-Night, Season Change, Lifestyle, Agent Composite, Creative/Fantasy, Object Animation, Furniture Staging...

**Error Distribution:**
- 35% Hiểu sai yêu cầu
- 26% AI output kém
- 22% Trễ deadline
- 17% Logic/Physics sai

## ⚠️ Important Notes

### Sandbox Lifetime
- ⏰ Valid: ~1 giờ
- 🔄 Auto-extend khi có activity
- 💾 Data: In-memory (không persist)

### Limitations
- ❌ Không có database thật (D1 chưa setup)
- ❌ URL thay đổi mỗi lần restart sandbox
- ❌ Data sẽ mất khi sandbox stop

### Advantages
- ✅ Không cần setup gì
- ✅ Public URL để share
- ✅ AI hoạt động ngay
- ✅ Free, no credit card

## 🎯 Làm Gì Với URL Này?

### Share với Team
```
📧 Email: Copy URL và gửi
💬 Slack/Teams: Paste link
📱 Mobile: Scan QR (dùng tool online tạo QR)
```

### Demo cho Client
```
✅ Vào /ai-tools
✅ Chọn Gemini
✅ Nhập brief thực tế
✅ Show kết quả real-time
```

### Test & Feedback
```
✅ Test từng feature
✅ Ghi nhận bugs
✅ Suggest improvements
✅ Plan next phase
```

## 🔄 Extend Sandbox Lifetime

Sandbox tự động extend khi:
- 🖱️ Có user activity
- 🔄 Có API calls
- 🌐 Browser tab active

**Tip**: Để tab mở hoặc set auto-refresh mỗi 10 phút.

---

**Last Updated**: 2026-01-30  
**Status**: 🟢 Active  
**PM2**: fotober-rd-hub (PID 2486)  
**Response Time**: < 5s for AI
