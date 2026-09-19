const {test,expect} = require('@playwright/test')
const Exceljs = require('exceljs')

async function writeExcelTest(findText,replacetext,filepath,sheetname) 
{
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath)
    const worksheet = workbook.getWorksheet(sheetname);
    let cord = await readExcelTest(worksheet,findText)

    const cell = worksheet.getCell(cord.rnum,cord.cnum);
    cell.value = replacetext;
    await workbook.xlsx.writeFile(filepath)
    console.log(worksheet.getCell(cord.rnum,cord.cnum).value)

}

async function readExcelTest(worksheet,findtext)
{
    let cord = {}

    worksheet.eachRow(  (row,rownum)=> 
    {
        row.eachCell( (cell,colnum)=>
        {
            if(cell.value===findtext)
            {
                console.log("Row Number:"+rownum);
                console.log("Column Number:"+colnum);

                cord.rnum=rownum
                cord.cnum=colnum
            }
        })
    })
    return cord
}


//---------------------------------------------------------
test('Excel Upload Download',async({page})=>
{
    const searchText = "Iphone"
    const replaceText = "Goo"
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const downloadpage = page.waitForEvent('download') //waits for the download to complete
    await page.locator("#downloadButton").click()
    await downloadpage;
    await writeExcelTest(searchText,replaceText,"C:/Users/shukl/Downloads/download.xlsx","Sheet1");
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("C:/Users/shukl/Downloads/download.xlsx"); //this upload only works on attribute type='file'
    await page.screenshot({path:'change.png'})
    await page.getByText(replaceText).screenshot({path: 'partialexcel.png'})
    const found = page.getByText(replaceText);
    const desiredrow = await page.getByRole("row").filter({has : found});
    console.log(await desiredrow.locator("#cell-4-undefined").textContent());

})
