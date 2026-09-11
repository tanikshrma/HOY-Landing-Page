import 'dotenv/config';

/** Hard cap on how many people can claim a spot in a single day. */
export const DAILY_CAPACITY = Number(process.env.DAILY_CAPACITY || 20);

/**
 * The day boundary is India time, not the server's. A VM in us-central would
 * otherwise roll the counter over at 11:30am Mumbai time.
 */
export const TIMEZONE = process.env.TIMEZONE || 'Asia/Kolkata';

export const PORT = Number(process.env.PORT || 3000);

/** Guards /api/admin/leads.csv. Without it the route is disabled entirely. */
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

/**
 * Optional. Every accepted lead is POSTed here as JSON — point it at a Slack
 * incoming webhook, a Zapier/Make catch hook, or your own CRM. Fire-and-forget:
 * a failure here never fails the user's submission.
 */
export const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || '';

/** Submissions allowed per IP per hour, before we start returning 429. */
export const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR || 5);

/**
 * A real human takes at least a few seconds to fill three fields. Anything
 * faster is a bot replaying the form.
 */
export const MIN_FILL_SECONDS = Number(process.env.MIN_FILL_SECONDS || 2.5);
