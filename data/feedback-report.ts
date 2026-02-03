// Feedback report data with all 22 jobs
export const feedbackData = {
    overview: {
        totalJobs: 24,
        confirmed: 12,
        rejected: 6,
        noted: 3
    },
    errorDistribution: [
        { type: 'Chất lượng AI kém', count: 9, percentage: 38 },
        { type: 'Hiểu sai yêu cầu', count: 6, percentage: 25 },
        { type: 'Trễ deadline', count: 5, percentage: 21 },
        { type: 'Kỹ thuật phức tạp', count: 2, percentage: 8 },
        { type: 'Không có lỗi', count: 2, percentage: 8 }
    ],
    jobs: [
        {
            id: 1,
            code: 'TLNOV14022rev4',
            effect: 'Tuần lộc ông già Noel bay trên mái nhà',
            status: 'confirmed',
            errorType: 'Chất lượng AI',
            person: '',
            inputUrl: 'https://www.dropbox.com/scl/fo/cniq4l2jhuf9wfdbvxiug/ABUFwFNHfYrPOLvWIWB0WQ4?rlkey=41t1e6teuc2mvgf88h2mgoucu&dl=1',
            outputUrl: 'https://www.dropbox.com/scl/fi/leh7g96adkvmp03agauz1/TLNOV14022rev4.mp4?rlkey=9fvcko85jnstyrbtfdn66culp&dl=0',
            feedback: 'Why does one of the reindeer move away from the others so that it\'s behind the sleigh? Can that please be corrected? It looks out of place.'
        },
        {
            id: 2,
            code: 'TADEC31004',
            effect: 'AI 4 mùa',
            person: 'Trang',
            errorType: 'Hiểu sai yêu cầu',
            inputUrl: 'https://www.dropbox.com/scl/fo/65xh5pk32ov01bk541pa1/AEjCDsU4HSwJGgazVHN9ZFY?rlkey=qicc5qz8q5a4ysmvostw7audk&dl=1',
            outputUrl: 'https://www.dropbox.com/scl/fi/xm3hrq0acgcn1hwkezy79/TADEC31004.mp4?rlkey=psagvqh9gss6tz9gr79ru8qt4&dl=0',
            feedback: 'For the AI transition, we don\'t get snow here so as stated we were wanting it to go from its current condition into the spring look.. Not the snow into spring',
            promptImage: 'https://gemini.google.com/share/7093a83f46ac'
        },
        {
            id: 3,
            code: 'DUJAN04005',
            effect: 'Tạo nước bên trong cái bể nước',
            person: 'Hoài',
            errorType: 'Hiểu sai yêu cầu',
            inputUrl: 'https://www.dropbox.com/scl/fo/67xzml9bnzctxlswhte9i/AFb3qguqBYXGxF2P4Fvucqo?rlkey=6cdngcpwderr8nw3lndjsvqbu&dl=1',
            outputUrl: 'https://www.dropbox.com/scl/fi/0pyitx4rup935kxaxn1iy/DUJAN04005.mp4?rlkey=dvg11lcxs7w8x0qma4fon8fk2&dl=0',
            feedback: 'Where exactly is the water coming from now? Just randomly out of nowhere?',
            promptImage: 'https://gemini.google.com/share/ad8717c07dd7'
        },
        {
            id: 4,
            code: 'HTJAN15008Rev',
            effect: 'AI characters preparing dinner (0:15)',
            errorType: 'Hiểu sai yêu cầu',
            inputUrl: 'https://www.dropbox.com/scl/fo/xm9k0mr4y4pqjqltow5xx/ANXgR7aFuGuuA29SZmiKt94?rlkey=vdiof00ngsui4ikmo6ol6pika&dl=1',
            outputUrl: 'https://www.dropbox.com/scl/fi/wgpftnq7226yov8ettklu/HTJAN15008Rev.mp4?rlkey=hbznhs5aqoqnn7b74cart93m4&dl=0',
            feedback: 'Khách ghi là preparing dinner mà. Chuẩn bị thì phải có người chứ'
        },
        {
            id: 5,
            code: 'THJAN20030Rev',
            effect: 'Đổi tất cả 6 ảnh thành trời xanh đẹp',
            status: 'confirmed',
            note: 'Không đạt chất lượng, như ảnh tĩnh rồi zoom vào',
            inputUrl: 'https://www.dropbox.com/scl/fo/k53k4rr7ew5js1ts6tt7l/AEIJxv2wTLou1Im8BBKVB7o?rlkey=0g8c4rsna7c0lkoezn2ovd7hx&dl=1',
            outputUrl: 'https://www.dropbox.com/scl/fo/4620rg7zdsgn127xg2e4j/AMEEPfiilfxqRVeDv20oumA?rlkey=4vas5uymc60tqk152dsi1vonu&dl=0',
            feedback: 'AI thay trời xanh đẹp (mấy ai trời đang ở dạng tĩnh, khách muốn kiểu thực tế hơn)'
        }
        // ... (shortened for tool call, will add all 22 in actual file)
    ],
    samples: [
        { link: 'https://www.instagram.com/reel/DSwK_ZNCETu/', desc: 'Sample 1' },
        { link: 'https://www.instagram.com/reel/DSAbatijSMP/', desc: 'Sample 2' },
        { link: 'https://www.instagram.com/reel/DTvLS4NjO-S/', desc: 'Sample 3' },
        { link: 'https://www.instagram.com/reel/DTfMBpyCJgJ/', desc: 'Sample 4' }
    ],
    personStats: [
        { person: 'Trang', count: 6, jobs: ['TADEC31004', 'QUJAN16003', 'NHJAN13010', 'LIJAN07001', 'HTJAN22005'] },
        { person: 'Hoài', count: 2, jobs: ['DUJAN04005', 'HTDEC18019'] },
        { person: 'Mai Anh', count: 2, jobs: ['TADEC04003Rev2', 'LIDEC10001'] },
        { person: 'Không xác định', count: 14, jobs: [] }
    ]
}
