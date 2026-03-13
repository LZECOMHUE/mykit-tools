import subprocess
import threading
import tkinter as tk
from tkinter import scrolledtext

def run_cmd(cmd, cwd=None):
    """Run a shell command and return (stdout, stderr, returncode)."""
    result = subprocess.run(
        cmd, shell=True, capture_output=True, text=True, cwd=cwd
    )
    return result.stdout.strip(), result.stderr.strip(), result.returncode

class PushApp:
    def __init__(self, root):
        self.root = root
        root.title("MyKit.tools - Git Push")
        root.geometry("540x480")
        root.configure(bg="#f8f8f8")
        root.resizable(False, False)

        # Header
        header = tk.Frame(root, bg="#2563eb", height=48)
        header.pack(fill="x")
        header.pack_propagate(False)
        tk.Label(
            header, text="MyKit.tools Push", font=("Segoe UI", 14, "bold"),
            fg="white", bg="#2563eb"
        ).pack(side="left", padx=16)

        # Commit message
        msg_frame = tk.Frame(root, bg="#f8f8f8", padx=16, pady=(12, 4))
        msg_frame.pack(fill="x")
        tk.Label(
            msg_frame, text="Commit message:", font=("Segoe UI", 10),
            bg="#f8f8f8", fg="#1a1a1a"
        ).pack(anchor="w")
        self.msg_entry = tk.Entry(
            msg_frame, font=("Segoe UI", 11), relief="solid", bd=1
        )
        self.msg_entry.pack(fill="x", pady=(4, 0), ipady=4)
        self.msg_entry.insert(0, "Update tools and fixes")

        # Buttons row
        btn_frame = tk.Frame(root, bg="#f8f8f8", padx=16, pady=8)
        btn_frame.pack(fill="x")

        self.push_btn = tk.Button(
            btn_frame, text="Stage, Commit & Push", font=("Segoe UI", 11, "bold"),
            bg="#2563eb", fg="white", activebackground="#1d4ed8",
            activeforeground="white", relief="flat", cursor="hand2",
            padx=20, pady=6, command=self.do_push
        )
        self.push_btn.pack(side="left")

        self.status_label = tk.Label(
            btn_frame, text="Ready", font=("Segoe UI", 10),
            bg="#f8f8f8", fg="#525252"
        )
        self.status_label.pack(side="left", padx=12)

        # Log output
        log_frame = tk.Frame(root, bg="#f8f8f8", padx=16, pady=(4, 12))
        log_frame.pack(fill="both", expand=True)
        tk.Label(
            log_frame, text="Log:", font=("Segoe UI", 10),
            bg="#f8f8f8", fg="#1a1a1a"
        ).pack(anchor="w")
        self.log = scrolledtext.ScrolledText(
            log_frame, font=("Consolas", 9), height=16, relief="solid",
            bd=1, bg="white", fg="#1a1a1a", wrap="word"
        )
        self.log.pack(fill="both", expand=True, pady=(4, 0))
        self.log.configure(state="disabled")

    def append_log(self, text, tag=None):
        self.log.configure(state="normal")
        self.log.insert("end", text + "\n", tag)
        self.log.see("end")
        self.log.configure(state="disabled")

    def set_status(self, text, colour="#525252"):
        self.status_label.config(text=text, fg=colour)

    def do_push(self):
        msg = self.msg_entry.get().strip()
        if not msg:
            self.set_status("Enter a commit message", "#dc2626")
            return
        self.push_btn.config(state="disabled")
        self.set_status("Working...", "#2563eb")
        self.log.configure(state="normal")
        self.log.delete("1.0", "end")
        self.log.configure(state="disabled")
        threading.Thread(target=self._run_push, args=(msg,), daemon=True).start()

    def _run_push(self, msg):
        steps = [
            ("Checking status...", "git status --short"),
            ("Staging all changes...", "git add -A"),
            ("Committing...", f'git commit -m "{msg}"'),
            ("Pushing to origin...", "git push"),
        ]

        for label, cmd in steps:
            self.root.after(0, self.append_log, f"\n> {label}")
            self.root.after(0, self.append_log, f"  $ {cmd}")
            stdout, stderr, code = run_cmd(cmd)

            if stdout:
                self.root.after(0, self.append_log, stdout)
            if stderr:
                self.root.after(0, self.append_log, stderr)

            # Allow "nothing to commit" as non-fatal on the commit step
            if code != 0:
                if "nothing to commit" in (stdout + stderr):
                    self.root.after(0, self.append_log, "(Nothing new to commit, continuing...)")
                    continue
                self.root.after(0, self.set_status, f"Failed: {label}", "#dc2626")
                self.root.after(0, self.append_log, f"\nFailed with exit code {code}")
                self.root.after(0, lambda: self.push_btn.config(state="normal"))
                return

        self.root.after(0, self.set_status, "Pushed successfully!", "#16a34a")
        self.root.after(0, self.append_log, "\nAll done!")
        self.root.after(0, lambda: self.push_btn.config(state="normal"))


if __name__ == "__main__":
    root = tk.Tk()
    app = PushApp(root)
    root.mainloop()
