import { getCollection } from "astro:content";
import {
	formatDuration,
	formatMonth,
	monthsBetween,
} from "@/modules/resume/dates";

const formatPeriod = (start: Date, end?: Date) => {
	if (!end) return `${formatMonth(start)} — Present`;
	if (end.getTime() === start.getTime()) return formatMonth(start);
	return `${formatMonth(start)} — ${formatMonth(end)}`;
};

// Roles newest first, with the labels the timeline and the detail views share.
export const getExperiences = async (now = new Date()) =>
	(await getCollection("experiences"))
		.sort((a, b) => b.data.start.getTime() - a.data.start.getTime())
		.map(({ id, data }) => ({
			id,
			...data,
			current: !data.end,
			period: formatPeriod(data.start, data.end),
			duration: formatDuration(monthsBetween(data.start, data.end ?? now)),
		}));
