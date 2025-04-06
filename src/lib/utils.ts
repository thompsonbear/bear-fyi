import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Point } from '$lib/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

export function clearAnimations(element: HTMLElement) {
	let animations = element.getAnimations();
	for (let x = 0; x < animations.length; x++) {
		animations[x].cancel();
	}
}

// Distance between two points
export function getDistance(first: Point, second: Point) {
	return Math.sqrt((second.x - first.x) ** 2 + (second.y - first.y) ** 2);
}

export async function resolveDomainRecord(record_type: string, domain: string) {
	let url = `https://dns.google/resolve?name=${domain}`
	if(record_type){
		url += `&type=${record_type}`
	}
	const res = await fetch(url)

	if (res.ok) {
		return res.json();
	} else {
		return "";
	}
}
