const puppeteer = require('puppeteer')

const startBrowser = async () => {
    let browser
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        })
    } catch (error) {
        console.log('Không Thể Khởi Tạo Browser !' + error);
    }
    return browser
}

module.exports = { startBrowser }