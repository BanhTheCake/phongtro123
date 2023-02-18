const { startBrowser } = require('./scrapeInit');
const fs = require('fs');

const browserInstance = startBrowser();

const scrapeCategory = (browser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = 'https://phongtro123.com/';
            let page = await browser.newPage();
            console.log('>> Khởi tạo 1 trang mới ');
            await page.goto(url);
            console.log('Truy cập vào trang web: ' + url);
            await page.waitForSelector('#webpage');
            const dataCategory = await page.$$eval(
                '#menu-main-menu > li',
                (els) => {
                    return els.map((el) => ({
                        link: el.querySelector('a').href,
                        content: el.querySelector('a').innerText,
                    }));
                }
            );
            await page.close();
            resolve(dataCategory);
        } catch (error) {
            reject(error);
        }
    });
};

const scrapeContent = (browser, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataContent = {};
            let page = await browser.newPage();
            console.log('>> Khởi tạo 1 trang mới ');
            await page.goto(url);
            console.log('Truy cập vào trang web: ' + url);
            await page.waitForSelector('#left-col');

            dataContent.title = await page.$eval(
                '#left-col > article > header > h1 > a',
                (el) => el.innerText
            );

            if ((await page.$('#left-col > article > header > h1 > span')) !== null) {
                dataContent.star = (
                    await page.$eval(
                        '#left-col > article > header > h1 > span',
                        (el) => el.className
                    )
                ).replace(/^\D+/g, '');
            }

            dataContent.address = await page.$eval(
                '#left-col > article > header > address',
                (el) => el.innerText
            );

            dataContent.attr = {
                price: await page.$eval(
                    '#left-col > article > header > .post-attributes > .price > span',
                    (el) => el.innerText
                ),
                acreage: await page.$eval(
                    '#left-col > article > header > .post-attributes > .acreage > span',
                    (el) => el.innerText
                ),
                published: await page.$eval(
                    '#left-col > article > header > .post-attributes > .published > span',
                    (el) => el.innerText
                ),
                hashtag: await page.$eval(
                    '#left-col > article > header > .post-attributes > .hashtag > span',
                    (el) => el.innerText
                ),
            };

            dataContent.class = await page.$eval(
                '#left-col > article > header > p > a > strong',
                (el) => el.innerText
            );

            const dataImg = await page.$$eval(
                '.post-images > .images-swiper-container > .swiper-wrapper > .swiper-slide',
                (els) => {
                    return els.map((el) => {
                        return el.querySelector('img')?.src;
                    });
                }
            );
            dataContent.img = dataImg.filter((img) => img);

            dataContent.description = await page.$$eval(
                'section.post-main-content > .section-content > p',
                (els) => {
                    return els.map((el) => el.innerText);
                }
            );

            dataContent.features = await page.$$eval(
                'section.post-overview > .section-content > table > tbody > tr',
                (els) => {
                    return els.map((el) => {
                        return {
                            name: el.querySelector('td:first-child').innerText,
                            value: el.querySelector('td:last-child').innerText,
                        };
                    });
                }
            );

            dataContent.info = await page.$$eval(
                'section.post-contact > .section-content > table > tbody > tr',
                (els) => {
                    return els.map((el) => {
                        return {
                            name: el.querySelector('td:first-child').innerText,
                            value: el.querySelector('td:last-child').innerText,
                        };
                    });
                }
            );
            await page.close();
            console.log('>> Đóng web ' + url);
            resolve(dataContent);
        } catch (error) {
            reject(error);
        }
    });
};

const scrapeContents = (browser, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataContents = {};
            let page = await browser.newPage();
            console.log('>> Khởi tạo 1 trang mới ');
            await page.goto(url);
            console.log('Truy cập vào trang web: ' + url);

            await page.waitForSelector('#left-col');
            dataContents.header = {
                title: await page.$eval(
                    '#main > header > h1',
                    (el) => el.innerText
                ),
                description: await page.$eval(
                    '#main > header > p',
                    (el) => el.innerText
                ),
            };
            const dataLinkContent = await page.$$eval(
                '#left-col > section > .post-listing  > li > div > h3',
                (els) => {
                    return els.map((el) => el.querySelector('a').href);
                }
            );

            dataContents.content = [];
            for (const link of dataLinkContent) {
                const data = await scrapeContent(browser, link);
                dataContents.content.push(data);
            }
            await page.close();
            resolve(dataContents);
        } catch (error) {
            reject(error);
        }
    });
};

const scrapeController = async () => {
    try {
        const indexCategory = [1, 2, 3, 4];
        const browser = await browserInstance;
        const dataPage = {};

        const dataCategories = (await scrapeCategory(browser)) || [];
        const dataCategoryFilter = dataCategories.filter((_, index) =>
            indexCategory.includes(index)
        );

        fs.writeFileSync(
            './chothuephongtro.json',
            JSON.stringify(
                await scrapeContents(browser, dataCategoryFilter[0].link)
            ),
            (err) => {
                if (err) console.log('Ghi file đã xảy ra lỗi !! ' + err);
            }
        );

        fs.writeFileSync(
            './nhachothue.json',
            JSON.stringify(
                await scrapeContents(browser, dataCategoryFilter[1].link)
            ),
            (err) => {
                if (err) console.log('Ghi file đã xảy ra lỗi !! ' + err);
            }
        );

        fs.writeFileSync(
            './chothuecanho.json',
            JSON.stringify(
                await scrapeContents(browser, dataCategoryFilter[2].link)
            ),
            (err) => {
                if (err) console.log('Ghi file đã xảy ra lỗi !! ' + err);
            }
        );

        fs.writeFileSync(
            './chothuematbang.json',
            JSON.stringify(
                await scrapeContents(browser, dataCategoryFilter[3].link)
            ),
            (err) => {
                if (err) console.log('Ghi file đã xảy ra lỗi !! ' + err);
            }
        );
    } catch (error) {
        console.log('Không Thể Chạy Controller ' + error);
    }
};

scrapeController();
