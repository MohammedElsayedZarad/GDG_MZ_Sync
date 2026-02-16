# Code Review Report
**Repo:** https://github.com/Ahmed-Mohsen-2005/Smart-home-controller.git
**Date:** 2026-02-16
**Files reviewed:** 2

---

## Summary
<Overall health: Critical Issues>

The codebase contains critical logic errors that cause data loss immediately upon execution. The architecture relies heavily on global variables and repetitive code, making it difficult to maintain. Security vulnerabilities exist in the authentication logic. The GUI application fails to run in a headless environment and has structural issues with the main event loop.

---

## File Reviews

### `repo/thefunctions.py` [FAIL]
**Language:** Python
**Execution:** SUCCESS (but destructive)
**Linter:** Many issues (Pylint: 7.08/10). Issues: `line-too-long`, `missing-docstring`, `global-variable-undefined`, `redefined-outer-name`, `unspecified-encoding`.
**Issues:**
- **Critical Data Loss:** The code at the bottom of the file (lines 893-902) opens `temperature.txt`, `water.txt`, etc., in `"w"` mode. This runs immediately when the file is imported by `GUI.py`, erasing all existing data in these files.
- **Security:** The `login` function checks for credentials using `if username in data`, which allows for partial matches (e.g., username "admin" would match inside "administrator").
- **Logic:** `Save_user` only reads the first line of `users.txt` to check for existing users, failing to detect duplicates if they are on subsequent lines.
- **Code Quality:** Extensive use of global variables (`t`, `l`, `w`, `g`, `d`) makes state management fragile.
- **Repetition:** Logic for each room is copy-pasted with minor changes instead of using parameterized functions.
**Verdict:** Contains critical bugs that cause data loss and security vulnerabilities.

### `repo/GUI.py` [FAIL]
**Language:** Python
**Execution:** FAILED (Tkinter `TclError` due to headless environment)
**Linter:** Moderate issues (Pylint: 8.40/10). Issues: `line-too-long`, `broad-exception-caught`, `too-many-statements`.
**Issues:**
- **Import Side Effect:** Importing `Save_user` from `thefunctions` triggers the file truncation bug described above.
- **Logic:** The `show_splash` function schedules `main_application` to run after 5 seconds but also calls it immediately after `splash.mainloop()`, potentially leading to double execution.
- **Hardcoded Dependencies:** Relies on local image files (`splash2.png`, `home.jpg`) without fallback or resource bundling.
- **Error Handling:** `login_page` assumes a specific file format in `users.txt` (split by `\t` and `: `), which will crash if the file is manually edited or corrupted.
**Verdict:** The GUI structure is flawed and triggers destructive side effects from the imported module.

---

## Overall Recommendations
1.  **Fix Data Loss on Import:** Wrap the file initialization code in `thefunctions.py` inside a function or an `if __name__ == "__main__":` block so it doesn't run when imported. Use `a` (append) or `r+` mode instead of `w` if preservation is intended, or check if files exist first.
2.  **Refactor Authentication:** Rewrite the login logic to properly parse the `users.txt` file (e.g., using the `csv` module or JSON) to avoid partial string matching vulnerabilities. Ensure the signup process checks all lines for duplicates.
3.  **Reduce Code Repetition:** Refactor `thefunctions.py` to use a class-based structure (e.g., a `Room` class) or generic functions that accept room objects, eliminating the need for copy-pasted `if/elif` blocks for every room.
4.  **Avoid Global Variables:** Pass state (lists like `t`, `l`, `d`) as arguments to functions or encapsulate them within a class to improve maintainability and testability.
