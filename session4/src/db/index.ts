import { NewsDetailsType } from '@/types';
import sql from 'better-sqlite3';

const db = sql('data.db');

export async function getAllNews() {
    const news = db.prepare('SELECT * FROM news').all();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return news as NewsDetailsType[];
}

export async function getNewsItem(slug: string) {
    const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return newsItem as NewsDetailsType;
}

export async function getLatestNews() {
    const latestNews = db
        .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
        .all();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return latestNews as NewsDetailsType[];
}

export async function getAvailableNewsYears() {
    const years = db
        .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
        .all()
        .map((year) => (year as { year: string }).year);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return years;
}

export async function getAvailableNewsMonths(year: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db
        .prepare(
            "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
        )
        .all(year)
        .map((month) => (month as { month: string }).month);
}

export async function getNewsForYear(year: string) {
    const news = db
        .prepare(
            "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
        )
        .all(year);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news as NewsDetailsType[];
}

export async function getNewsForYearAndMonth(year: string, month: string) {
    const news = db
        .prepare(
            "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
        )
        .all(year, month);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news as NewsDetailsType[];
}