# AstroMax Easy Stretch Mono

**A PixInsight script for composing narrowband mono masters into RGB and applying interactive stretch.**

Part of the **AstroMax** suite of PixInsight scripts by Dean Linic.

---

## What it does

AstroMax Easy Stretch Mono takes your calibrated mono masters (Hα, OIII, SII or any combination) open in PixInsight, combines them into an RGB image and lets you stretch interactively with a live preview — all in one step.

- **Free channel assignment** — drag any mono master to R, G or B. No palette lock-in.  
  Want HOO? Set Ha→R, OIII→G, OIII→B. SHO? Ha→R, SII→G, OIII→B. Your call.
- **Automatic channel equalisation** — before stretching, all channels are normalised to the brightest one so the image comes out balanced from the start
- **Live preview** — adjust Blackpoint, Stretch, Contrast, Background, Midtones and Highlights with instant feedback at 25 % scale
- **Apply & Continue** — bake the current stretch and reset sliders for a second pass (useful for two-stage stretching)
- **Create New Photo** — applies all parameters and opens the result as a new PixInsight image. Original masters are never modified

---

## Requirements

- PixInsight 1.8.9 or later
- Mono (.xisf or .fit) masters already integrated and open as separate image windows

---

## Installation

1. Download `AstroMaxEasyStretchMono.js`
2. In PixInsight go to **Script → Feature Scripts**
3. Click **Add** and navigate to the downloaded file  
   — or copy it to `<PixInsight>/src/scripts/` for a permanent global install
4. The script appears under **Script → Utilities → AstroMax Easy Stretch Mono**

---

## How to use

1. Open your mono masters in PixInsight (e.g. Ha, OIII, SII)
2. Run the script from **Script → Utilities → AstroMax Easy Stretch Mono**
3. In the **Channel Composition** section assign each master to R, G and B
   - Example HOO: `Ch R = Ha`, `Ch G = OIII`, `Ch B = OIII`
   - Example SHO: `Ch R = Ha`, `Ch G = SII`, `Ch B = OIII`
4. Click **⚡ Compose & Preview** — channels are equalised and a preview appears
5. Adjust the stretch sliders until happy
6. Click **✅ Create New Photo** to produce the final image

---

## Sliders

| Slider | What it does |
|--------|-------------|
| Blackpoint | Clips the background before the main stretch |
| General Stretch | Main midtone stretch — higher = brighter |
| Contrast | Expands (positive) or compresses (negative) tonal range |
| Background | Brightens or darkens the background independently |
| Midtones | Shifts midtone brightness left (darker) or right (brighter) |
| Highlights | Controls highlight compression / recovery |

---

## Trial & Licensing

The script includes a **30-day free trial** from first run, shared across all AstroMax scripts.

After the trial you can purchase a license at **[astromax.software](https://astromax.software)** *(link placeholder)*.

**Activation:**
1. Click the **🔑 License** button in the script UI at any time
2. Copy your **HWID** shown in the dialog
3. Send the HWID to the author together with proof of purchase
4. You will receive a license key by email
5. Paste the key into the dialog and click **Activate**

The license is tied to your computer (username + hostname) and does not expire.

---

## Part of the AstroMax suite

| Script | Description |
|--------|-------------|
| **AstroMax Easy Stretch Mono** | Narrowband channel compose + stretch *(this script)* |
| [AstroMax Easy Stretch OSC](https://github.com/...) | One-click stretch for RGB / OSC images |
| [AstroMax Clarity](https://github.com/...) | Lightroom-style clarity and luminance sharpening |

---

## Changelog

**v1.2.0**
- HWID-based license system with 30-day trial
- 🔑 License button in main UI for activation at any time
- Channel equalisation before stretch (normalise to strongest channel)
- Compose via direct `getSamples`/`setSamples` — more reliable than ChannelCombination

**v1.0.0**
- Initial release

---

## License

Copyright © 2026 Dean Linic. All rights reserved.  
This script may not be redistributed or modified without written permission.
