# LaunchReel for Claude Code

Claude makes a launch video for the app in your repo, or edits a recording of you talking into a reel; you watch and edit it on a timeline.

- **Claude** reads the repo, inspects the running app, plans the film (spine, beats, carriers), then
  **designs and writes every scene as code** for your product (Remotion + LaunchReel's cinema kit:
  camera moves, parallax depth, light, texture, morph carriers, settling type, hits and risers). It records the narration,
  measures and looks at the motion, and fixes it. The ready-made looks (halftone film, Poko, CRT, paper,
  clean) are still there when you want something fast.
- **Film settings** (the side panel's Film tab): brand colours that restyle every scene, voice and
  music levels. **Transitions:** click the dot at any cut on the timeline (cut, crossfade, flood, dot
  wipe, zoom, TV static).
- **You** edit in the **Studio** (http://localhost:4747, opened by Claude): drag a clip's edge to
  retime (snaps to words), drag to reorder, click to select, edit any text in the inspector, switch
  16:9/9:16, change music, ⌘Z. Claude sees your edits and your selection ("make *this* scene punchier").
- Everything lives in `./launchreel/` in your repo: `project.json` (the video), `assets/` (voice),
  `out/` (MP4s).

## Install

```
/plugin marketplace add gajanansr/launchreel-plugin
/plugin install launchreel@launchreel
```

That's it. The plugin starts `launchreel-mcp` from npm (`npx -y launchreel-mcp`) the first time it runs;
the first render also downloads Chrome Headless Shell (Remotion does this once). Needs Node 20+.

Without the plugin (tools only, no skills):

```sh
claude mcp add launchreel -- npx -y launchreel-mcp
```

### Your key

Without a key you get **one free video** with every feature; its exports carry a “Made with LaunchReel”
watermark. Buy a plan at https://launchreel.firstfoot.dev/plugin and you'll get a key by email. Then either
paste it in the Studio (**Plan → Save key**) or give it to the MCP server:

```sh
claude mcp add launchreel -e LAUNCHREEL_KEY=… -- npx -y launchreel-mcp
```

The voices, the music engine and the playbook (the craft that makes the films good) run on LaunchReel's
server with your key; the editor and rendering run on your machine. Check your usage at
https://launchreel.firstfoot.dev/account.

## Use

In your app's repo:

```
> make a 35-second launch video for this app with launchreel, halftone film look, with narration
```

Other things to say: "open the editor", "make this scene shorter", "use 9:16", "swap the music",
"make the 9:16 version for reels", "render it". The final MP4 goes to `./launchreel/out/`, or use **Export** in the Studio (1080p on every plan; 2K and 4K on Pro and Team).

Studio without Claude: `npx launchreel-mcp studio` in the repo that has the project.

## Talking heads

```
> edit my recording ~/Downloads/take.mov into a reel with launchreel
```

Claude transcribes it, cuts the ums, pauses and retakes (and checks every cut by listening back), then
illustrates what you say: real screen recordings of sites you mention, big words behind you, diagrams. Up to
10 minutes (2 on the free trial). On a Mac with whisper.cpp (`brew install whisper-cpp`) the transcription
runs locally — free, private and more precise; otherwise only the audio goes to LaunchReel's server.
In the Studio: cut and restore words in the Transcript tab, colour in Adjust, "Behind me" (B) for big type
behind your head.

## Comments that reach Claude by themselves

Pin comments on the frame (press `C` in the Studio). Two ways for Claude to pick them up without you
pasting anything:

- **Watch mode (works everywhere):** tell Claude "watch my comments". It waits on `watch_comments`, fixes
  each new comment as you post it, replies in its thread, and keeps watching. The Studio shows
  "👀 Claude is watching". Press Esc in Claude Code to stop.
- **Channels (Claude Code research preview):** start Claude Code with
  `--dangerously-load-development-channels server:launchreel` (or
  `plugin:launchreel@launchreel` when installed from the marketplace). New comments are then pushed into
  the session. On Team/Enterprise plans an admin must enable `channelsEnabled` first.

## Data and privacy

LaunchReel runs on your machine: your repo, your recordings, the transcripts, the videos and the renders stay
in `./launchreel/` in your repo. It never reads your contacts, email or other apps.

What leaves your machine, and where it goes:

| Service | What is sent | When |
|---|---|---|
| **LaunchReel's server** (launchreel.firstfoot.dev, on Cloudflare) | your licence key (or, on the trial, a random install id and the video's name); the text of narration lines; scene lengths for the score | licence checks, the playbook, voice, music |
| **LaunchReel's server → Cloudflare Workers AI** | the audio track of your recording (never the video) | talking heads, only when whisper.cpp isn't installed on your Mac |
| **npm** (registry.npmjs.org) | nothing personal: downloads the `launchreel-mcp` package | first run and updates |
| **Hugging Face** (huggingface.co) | nothing personal: downloads the speech model once | first talking head with whisper.cpp installed |
| **Google Fonts** | font requests while rendering | renders and previews |
| **Websites you point it at** | page visits by a headless browser | `inspect_app` and `record_site`, when you or Claude ask |

What the server keeps: no recordings, audio, transcripts, narration text or videos — they are processed and
discarded. It keeps what billing needs: a hash of your licence key (never the key), the email you bought
with, usage counts per month, and for a trial the install id, the first video's name and the IP address (to
keep the trial to one video). Payments go through Dodo Payments on the website, not through the plugin.
Details: https://launchreel.firstfoot.dev/privacy

## Many videos per repo

Every video has its own folder in `./launchreel/videos/`. Asking for a new video keeps the old ones.
Switch between them in the Studio's header, or tell Claude "open the video from last week".

## Tools

- **Scenes as code:**
  - `describe_kit`
  - `write_scene`: writes `launchreel/videos/<video>/scenes/<Name>.tsx`, compiles and lints it, and returns test
    frames. The Studio hot-reloads it.
- **Project:** `create_project`, `list_videos`, `open_video`, `get_project`, `get_selection`, `apply_edits`, `undo`, `validate`.
- **Looking:**
  - `preview_frames` (images)
  - `preview_motion` (a contact sheet, a row per scene)
  - `qa_report` (empty frames, still stretches, motion energy)
- **Comments:** `get_comments`, `watch_comments`, `reply_comment`.
- **Output:** `voice`, `render` + `render_status` (background), `open_editor`.
- **Templates:** `list_looks`, `describe_scenes`.

## Credits

The motion-craft skill adapts laws, numbers and the storyboard template from
[launch-film](https://github.com/uxmohamed/launch-film) by Mohamed Hassan (MIT); see
`skills/motion-craft/LICENSE-launch-film`.

Edits (from Claude or the Studio) are validated against each scene's schema; Claude's are also checked
for honesty — numbers on screen must come from the project's facts. Each batch is one undo step.

Env: `LAUNCHREEL_PORT` (default 4747; the next free port is used if taken), `LAUNCHREEL_WORKSPACE`
(default: the directory the server starts in).
