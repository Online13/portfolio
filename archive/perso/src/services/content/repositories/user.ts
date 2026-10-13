import user from "../data/user.json";

// Full years since the start of my career, counted at build time.
export const getExperienceYears = (now = new Date()) => {
	const { year, month } = user.careerStart;
	const currentMonth = now.getMonth() + 1;
	return now.getFullYear() - year + (currentMonth >= month ? 0 : -1);
};
