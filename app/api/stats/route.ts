import { NextResponse } from "next/server";
import axios from "axios";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME!;

export async function GET() {
  const stats = {
    githubCommits: 0,
    githubStreak: 0,
    leetcodeRating: 1750, // Update manually whenever your contest rating changes
    problemsSolved: 0,
  };

  /* -------------------------------------------------------------------------- */
  /*                                  GITHUB                                    */
  /* -------------------------------------------------------------------------- */

  try {
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    };

    // Fetch all repositories
    const { data: repos } = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      { headers }
    );

    let commits = 0;

    await Promise.all(
      repos.map(async (repo: any) => {
        try {
          const { data: contributors } = await axios.get(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contributors`,
            { headers }
          );

          const me = contributors.find(
            (user: any) =>
              user.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()
          );

          if (me) commits += me.contributions;
        } catch {
          // Ignore repositories where contributor data isn't available
        }
      })
    );

    stats.githubCommits = commits;

    // Approximate GitHub streak from recent activity
    try {
      const { data: events } = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
        { headers }
      );

      stats.githubStreak = new Set(
        events.map((event: any) =>
          new Date(event.created_at).toISOString().split("T")[0]
        )
      ).size;
    } catch {
      stats.githubStreak = 0;
    }
  } catch (err) {
    console.error("GitHub Error:", err);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 LEETCODE                                   */
  /* -------------------------------------------------------------------------- */

  try {
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const { data } = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: {
          username: LEETCODE_USERNAME,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const solved =
      data.data.matchedUser.submitStats.acSubmissionNum;

    stats.problemsSolved = solved.find(
      (item: any) => item.difficulty === "All"
    )?.count ?? 0;
  } catch (err) {
    console.error("LeetCode Error:", err);
  }

  return NextResponse.json(stats);
}