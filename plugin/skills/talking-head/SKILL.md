---
name: talking-head
description: Use when the user wants to edit a recording of themselves talking (a talking head, a reel, a vlog, a take.mov / IMG_1234.mov) — cut the ums and retakes, add captions and visuals — with LaunchReel.
---

# LaunchReel talking heads

The full playbook lives on LaunchReel's server and is updated there. **Before anything else, call the
`get_playbook` tool with part `"talking-head"` and follow it exactly.** It holds the whole process: loading the recording with `add_footage`, cutting and checking the cuts with `verify_cut`, the shot list, real screen recordings (`record_site`), words behind the speaker (`cutout`), and the review.

If `get_playbook` reports that the key is missing, expired or out of trial, tell the user in one line and
point them to https://launchreel.firstfoot.dev/plugin (they can paste a key in the Studio: Plan → Enter key).
