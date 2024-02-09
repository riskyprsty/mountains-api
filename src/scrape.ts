import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'

const url: string = 'http://www.peaklist.org/WWlists/ultras/indonesia.html'

type Mount = {
    name?: string | null
    country?: string | null
    city?: string | null
    height?: string | null
}
;(async () => {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const mountains: any = []

        $('tbody tr').each(function (idx, el): any {
            const mount: Mount = {}

            const name = $(el).find('td:nth-child(2) > small').text().trim()
            const country = $(el).find('td:nth-child(3) > small').text().trim()
            const city = $(el).find('td:nth-child(4) > small').text().trim()
            const height = $(el).find('td:nth-child(5) > small').text().trim()

            if (name) {
                let mountname: string
                let countryname: string

                if (name.includes('\n')) {
                    mountname = name.replace('\n', ' ')
                } else {
                    mountname = name
                }

                if (country.includes('\n')) {
                    countryname = country.replace('\n', ' ')
                } else {
                    countryname = country
                }

                mount.name = mountname
                mount.country = countryname
                mount.city = city
                mount.height = height

                mountains.push(mount)
            }
        })

        fs.writeFile(
            './data/mountains.json',
            JSON.stringify(mountains, null, 2),
            (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Berhasil mengambil data ke format json')
            }
        )
       // console.log(mountains)
    } catch (error) {
        console.log(error)
    }
})()
