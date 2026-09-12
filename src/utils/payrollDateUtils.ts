/**
 * Unified Workshop Payroll & Local Calendar Date Utilities
 *
 * Rules:
 * - Workshop payroll week is ALWAYS Sunday → Saturday.
 * - Sunday is the fixed weekly day off (0 EGP, OFF).
 * - Saturday is the last day of the payroll week and normal salary payment day.
 * - All dates are workshop local calendar dates ("YYYY-MM-DD").
 * - Zero UTC conversion to prevent single-day timezone offsets.
 */

/**
 * Format a Date object as workshop local calendar date "YYYY-MM-DD" without UTC conversion.
 */
export function formatDateLocal(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse a "YYYY-MM-DD" string into a local Date object anchored at 12:00:00 (noon).
 * Anchoring at noon guarantees no timezone offset or DST shift will alter the calendar date.
 */
export function parseLocalDate(dateInput: string | Date): Date {
  if (dateInput instanceof Date) {
    return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 12, 0, 0);
  }
  const cleanStr = String(dateInput).slice(0, 10);
  const [y, m, d] = cleanStr.split("-").map(Number);
  if (!y || !m || !d) {
    const fallback = new Date(dateInput);
    return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate(), 12, 0, 0);
  }
  return new Date(y, m - 1, d, 12, 0, 0);
}

/**
 * Returns today's workshop local calendar date as "YYYY-MM-DD".
 */
export function getTodayLocalDateString(): string {
  return formatDateLocal(new Date());
}

/**
 * Check if a given date string or Date object is a Sunday (fixed workshop weekly day off).
 */
export function isSunday(dateInput: string | Date): boolean {
  return parseLocalDate(dateInput).getDay() === 0;
}

/**
 * Calculate the Sunday start date ("YYYY-MM-DD") for the payroll week containing the given date.
 * Workshop payroll week is always Sunday → Saturday.
 * An optional offsetWeeks (positive or negative) shifts the week by exactly 7 calendar days.
 *
 * Rule:
 * For any given date, finding the Sunday start of that week is:
 * d.setDate(d.getDate() - d.getDay() + offsetWeeks * 7)
 */
export function getPayrollWeekStart(date?: Date | string, offsetWeeks: number = 0): string {
  const d = date ? parseLocalDate(date) : new Date();
  d.setHours(12, 0, 0, 0);
  const day = d.getDay(); // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  d.setDate(d.getDate() - day + offsetWeeks * 7);
  return formatDateLocal(d);
}

/**
 * Calculate the Saturday end date ("YYYY-MM-DD") for the payroll week.
 * Saturday is always exactly 6 days after Sunday.
 */
export function getPayrollWeekEnd(date?: Date | string): string {
  const sunStr = getPayrollWeekStart(date);
  const d = parseLocalDate(sunStr);
  d.setDate(d.getDate() + 6);
  return formatDateLocal(d);
}

export interface PayrollWeekDay {
  dateStr: string;         // "2026-09-06"
  dayName: string;         // "SUN"
  dayNameFull: string;     // "Sunday"
  formattedShort: string;  // "06 Sep"
  formattedLong: string;   // "Sunday 06 Sep"
  formattedHeader: string; // "SUN 06 SEP"
  dayIndex: number;        // 0 to 6
  dateObj: Date;
  isWeeklyOff: boolean;    // true for Sunday (fixed weekly day off)
}

/**
 * Single source of truth for the 7 daily columns of a payroll week (Sunday → Saturday).
 * Generates the exact 7 calendar dates starting Sunday with zero UTC timezone shifting.
 */
export function getPayrollWeekDates(date?: Date | string): PayrollWeekDay[] {
  const sunStr = getPayrollWeekStart(date);
  const baseDate = parseLocalDate(sunStr);

  const dayNamesShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const days: PayrollWeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + i, 12, 0, 0);
    const dateStr = formatDateLocal(d);
    const dayName = dayNamesShort[i];
    const dayNameFull = dayNamesFull[i];
    const dayNumStr = String(d.getDate()).padStart(2, "0");
    const monthStr = monthNames[d.getMonth()];
    const monthUpper = monthStr.toUpperCase();

    days.push({
      dateStr,
      dayName,
      dayNameFull,
      formattedShort: `${dayNumStr} ${monthStr}`,
      formattedLong: `${dayNameFull} ${dayNumStr} ${monthStr}`,
      formattedHeader: `${dayName} ${dayNumStr} ${monthUpper}`,
      dayIndex: i,
      dateObj: d,
      isWeeklyOff: i === 0,
    });
  }
  return days;
}

