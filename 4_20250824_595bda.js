// script.js
const API_KEY = '8103181920:AAGvAa38hCQ4AdhYoMxph2W6JSsAHOknaM4';
const CHANNEL_ID = '@marketvpsir';

document.addEventListener('DOMContentLoaded', function() {
    // مدیریت فرم ترجمه
    const translateForm = document.getElementById('translate-form');
    const sourceText = document.getElementById('source-text');
    const targetLang = document.getElementById('target-lang');
    const resultDiv = document.getElementById('translation-result');
    
    translateForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!sourceText.value.trim()) {
            showResult('لطفا متنی برای ترجمه وارد کنید', 'error');
            return;
        }
        
        showResult('در حال ترجمه...', 'loading');
        
        try {
            const translatedText = await translateText(sourceText.value, 'auto', targetLang.value);
            showResult(translatedText, 'success');
        } catch (error) {
            showResult('خطا در ترجمه متن', 'error');
        }
    });
    
    // تابع ترجمه با Google Translate API
    async function translateText(text, sourceLang, targetLang) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[0]) {
            return data[0].map(item => item[0]).join('');
        }
        throw new Error('ترجمه ناموفق بود');
    }
    
    function showResult(message, type) {
        resultDiv.innerHTML = `
            <div class="alert alert-${type}">
                ${type === 'loading' ? '<div class="spinner"></div>' : ''}
                ${message}
            </div>
        `;
    }
    
    // مدیریت دکمه شروع گفتگو با ربات
    document.getElementById('start-bot').addEventListener('click', function() {
        window.open(`https://t.me/${getBotUsername()}`, '_blank');
    });
    
    function getBotUsername() {
        // این تابع باید نام کاربری ربات را از API تلگرام دریافت کند
        return 'your_bot_username';
    }
});