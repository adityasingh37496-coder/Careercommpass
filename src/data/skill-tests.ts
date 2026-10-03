import type { SkillTest, SkillTestId } from "@/types/skill-test";

/** Static sample questions. Scoring happens locally in the browser (see lib/skill-scoring.ts). */
export const SKILL_TESTS: SkillTest[] = [
  {
    id: "python",
    title: "Python",
    skill: "Python",
    tagline: "Five quick questions on core Python.",
    instructions: [
      "5 multiple-choice questions with one correct answer each.",
      "No timer. You can go back and change answers before you finish.",
      "Read each snippet carefully and pick what Python would actually do.",
    ],
    questions: [
      {
        id: "py-1",
        prompt: "What does this code print?",
        code: "print(7 // 2)",
        options: ["3.5", "3", "4", "3.0"],
        correctIndex: 1,
        explanation: "// is floor division, so 7 // 2 gives 3 (an int), not 3.5.",
      },
      {
        id: "py-2",
        prompt: "Which of these creates a dictionary?",
        options: ["[1, 2]", "(1, 2)", "{1, 2}", '{"a": 1}'],
        correctIndex: 3,
        explanation: "A dictionary holds key: value pairs inside curly braces. {1, 2} is a set.",
      },
      {
        id: "py-3",
        prompt: "What does this list comprehension produce?",
        code: "[x * x for x in range(4)]",
        options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 1, 2, 3]", "[0, 2, 4, 6]"],
        correctIndex: 1,
        explanation: "range(4) yields 0, 1, 2, 3, and each value is squared: 0, 1, 4, 9.",
      },
      {
        id: "py-4",
        prompt: "What does this code print?",
        code: "a = [1, 2]\nb = a\nb.append(3)\nprint(a)",
        options: ["[1, 2]", "[3]", "[1, 2, 3]", "Error"],
        correctIndex: 2,
        explanation: "b = a makes both names point to the same list, so appending through b changes a too.",
      },
      {
        id: "py-5",
        prompt: "Which pair of keywords is used to handle an exception in Python?",
        options: ["try / except", "if / else", "catch / finally", "do / while"],
        correctIndex: 0,
        explanation: "Python uses try / except (optionally with else and finally). catch is not a Python keyword.",
      },
    ],
    summaries: {
      beginner:
        "You know some Python basics. Practise loops, lists, dictionaries and reading short snippets to build confidence.",
      intermediate:
        "You are comfortable with core Python. Next, build a small project with files, functions and error handling.",
      advanced:
        "You have a strong grasp of everyday Python. Try data libraries or a portfolio project to show it off.",
    },
  },
  {
    id: "sql",
    title: "SQL",
    skill: "SQL",
    tagline: "Five quick questions on querying data.",
    instructions: [
      "5 multiple-choice questions with one correct answer each.",
      "No timer. You can go back and change answers before you finish.",
      "Questions use standard SQL. Pick the query or clause that fits the goal.",
    ],
    questions: [
      {
        id: "sql-1",
        prompt: "Which query returns the names of customers who live in Pune?",
        options: [
          "SELECT name FROM customers WHERE city = 'Pune';",
          "SELECT city FROM customers WHERE name = 'Pune';",
          "SELECT * FROM 'Pune' WHERE customers;",
          "SELECT name FROM customers GROUP BY 'Pune';",
        ],
        correctIndex: 0,
        explanation: "SELECT picks the column, FROM names the table, and WHERE filters the rows.",
      },
      {
        id: "sql-2",
        prompt: "What does this query return?",
        code: "SELECT COUNT(*) FROM orders;",
        options: [
          "All the rows in orders",
          "The number of rows in orders",
          "The total value of orders",
          "The first row in orders",
        ],
        correctIndex: 1,
        explanation: "COUNT(*) counts rows and returns a single number.",
      },
      {
        id: "sql-3",
        prompt: "Which join keeps every row from the left table, even when there is no match on the right?",
        options: ["INNER JOIN", "CROSS JOIN", "LEFT JOIN", "SELF JOIN"],
        correctIndex: 2,
        explanation: "LEFT JOIN keeps all left-table rows and fills the right side with NULL when nothing matches.",
      },
      {
        id: "sql-4",
        prompt: "Which query gives the average salary for each department?",
        options: [
          "SELECT AVG(salary) FROM employees ORDER BY department;",
          "SELECT department, AVG(salary) FROM employees;",
          "SELECT department, AVG(salary) FROM employees GROUP BY department;",
          "SELECT department FROM employees WHERE AVG(salary);",
        ],
        correctIndex: 2,
        explanation: "GROUP BY makes one group per department, and AVG(salary) is calculated for each group.",
      },
      {
        id: "sql-5",
        prompt: "Which clause filters groups after aggregation, such as departments with more than 5 employees?",
        options: ["WHERE", "ORDER BY", "LIMIT", "HAVING"],
        correctIndex: 3,
        explanation: "WHERE filters rows before grouping. HAVING filters the groups after aggregates are calculated.",
      },
    ],
    summaries: {
      beginner:
        "You are at the start of your SQL journey. Practise SELECT, WHERE and GROUP BY on a small sample database.",
      intermediate:
        "You can read and write common queries. Next, practise joins, subqueries and filtering aggregated results.",
      advanced:
        "You handle filtering, grouping and joins confidently. Try window functions and query-performance basics next.",
    },
  },
  {
    id: "problem-solving",
    title: "Problem solving",
    skill: "Problem solving",
    tagline: "Five quick questions on logic and structured thinking.",
    instructions: [
      "5 multiple-choice questions with one correct answer each.",
      "No timer and no coding needed. You can go back and change answers before you finish.",
      "Think about the pattern, rule or process each question is testing.",
    ],
    questions: [
      {
        id: "ps-1",
        prompt: "What number comes next in this sequence?",
        code: "2, 6, 12, 20, ?",
        options: ["28", "30", "32", "26"],
        correctIndex: 1,
        explanation: "The gaps grow by 2 each time (4, 6, 8, 10), so the next number is 20 + 10 = 30.",
      },
      {
        id: "ps-2",
        prompt: "Which approach finds a name fastest in an alphabetically sorted list of 1,000 names?",
        options: [
          "Read every name from the start",
          "Check the middle name, then keep only the half where the name must be",
          "Pick names at random until you hit it",
          "Start from the end and read backwards",
        ],
        correctIndex: 1,
        explanation: "Halving the search space each step (binary search) needs about 10 checks instead of up to 1,000.",
      },
      {
        id: "ps-3",
        prompt: "A program crashes only for some inputs. What is the best first step?",
        options: [
          "Rewrite the whole program",
          "Ignore it, since it only happens sometimes",
          "Find the smallest input that reliably triggers the crash and study it",
          "Add more features to hide the problem",
        ],
        correctIndex: 2,
        explanation: "Reproducing the problem with the smallest failing case narrows down where the bug lives.",
      },
      {
        id: "ps-4",
        prompt: "All analysts on the team use SQL. Meera is an analyst on the team. Which statement must be true?",
        options: [
          "Meera uses SQL",
          "Everyone who uses SQL is an analyst",
          "Meera uses only SQL",
          "Meera is the best analyst on the team",
        ],
        correctIndex: 0,
        explanation: "If every analyst uses SQL and Meera is an analyst, Meera must use SQL. The other statements go beyond the facts.",
      },
      {
        id: "ps-5",
        prompt: "3 workers paint 3 walls in 3 hours, all working at the same pace. How long do 9 workers take to paint 9 walls?",
        options: ["1 hour", "3 hours", "9 hours", "27 hours"],
        correctIndex: 1,
        explanation: "Each worker paints one wall in 3 hours. With 9 workers and 9 walls, each still paints one wall in 3 hours.",
      },
    ],
    summaries: {
      beginner:
        "You are building your problem-solving habits. Practise breaking problems into small steps and spotting patterns.",
      intermediate:
        "You reason through problems well. Practise explaining your approach out loud and testing edge cases.",
      advanced:
        "You think through problems clearly and carefully. Try timed puzzles or coding challenges to keep sharpening it.",
    },
  },
];

export function getSkillTest(id: SkillTestId): SkillTest | undefined {
  return SKILL_TESTS.find((t) => t.id === id);
}
