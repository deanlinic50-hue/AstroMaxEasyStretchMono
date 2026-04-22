// ============================================================
//  AstroMaxEasyStretchMono.js  v1.3.0
//  Copyright (C) 2026 Dean Linic
//  Compose mono channels into RGB and stretch
// ============================================================

#feature-id    Utilities > AstroMax Easy Stretch Mono
#feature-info  AstroMax Easy Stretch Mono — Compose mono masters into RGB and stretch.<br/>

// ============================================================
//  LICENSE & TRIAL SYSTEM  (HWID-based, SHA-256 validation)
//  Trial: 30 days from first run, shared across all AstroMax scripts
//  Key:   sha256(HWID + "|ASTROMAX-V1|" + SECRET)[0..19] in 5x4 hex groups
// ============================================================
var LIC_PRODUCT_NAME = "AstroMaxEasyStretchMono";
var LIC_SETTINGS_KEY = "/AstroMax/AstroMaxEasyStretchMono/licenseKey";
var LIC_TRIAL_KEY    = "/AstroMax/trialStart";
var LIC_HWID_KEY     = "/AstroMax/hwid";
var LIC_TRIAL_DAYS   = 30;
var LIC_SECRET       = "AstroMax2025#Nebula$7x9qK!mP";

// ── Compact SHA-256 (pure JS, no dependencies) ─────────────
function licSHA256(str) {
   function rr(x,n){return(x>>>n)|(x<<(32-n));}
   var K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
          0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
          0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
          0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
          0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
          0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
          0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
          0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
   var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,
          0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
   var b=[];
   for(var i=0;i<str.length;i++){
      var c=str.charCodeAt(i);
      if(c<0x80)b.push(c);
      else if(c<0x800){b.push(0xC0|(c>>6));b.push(0x80|(c&0x3F));}
      else{b.push(0xE0|(c>>12));b.push(0x80|((c>>6)&0x3F));b.push(0x80|(c&0x3F));}
   }
   var bl=b.length*8;
   b.push(0x80);
   while(b.length%64!==56)b.push(0);
   for(var i=7;i>=0;i--)b.push((bl/Math.pow(2,i*8))&0xFF);
   for(var blk=0;blk<b.length;blk+=64){
      var W=[];
      for(var i=0;i<16;i++)
         W[i]=(b[blk+i*4]<<24)|(b[blk+i*4+1]<<16)|(b[blk+i*4+2]<<8)|b[blk+i*4+3];
      for(var i=16;i<64;i++){
         var s0=rr(W[i-15],7)^rr(W[i-15],18)^(W[i-15]>>>3);
         var s1=rr(W[i-2],17)^rr(W[i-2],19)^(W[i-2]>>>10);
         W[i]=(W[i-16]+s0+W[i-7]+s1)>>>0;
      }
      var a=H[0],b_=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
      for(var i=0;i<64;i++){
         var S1=rr(e,6)^rr(e,11)^rr(e,25);
         var ch=(e&f)^(~e&g);
         var t1=(h+S1+ch+K[i]+W[i])>>>0;
         var S0=rr(a,2)^rr(a,13)^rr(a,22);
         var mj=(a&b_)^(a&c)^(b_&c);
         var t2=(S0+mj)>>>0;
         h=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b_;b_=a;a=(t1+t2)>>>0;
      }
      H[0]=(H[0]+a)>>>0;H[1]=(H[1]+b_)>>>0;H[2]=(H[2]+c)>>>0;H[3]=(H[3]+d)>>>0;
      H[4]=(H[4]+e)>>>0;H[5]=(H[5]+f)>>>0;H[6]=(H[6]+g)>>>0;H[7]=(H[7]+h)>>>0;
   }
   var hex="";
   for(var i=0;i<8;i++)hex+=("00000000"+H[i].toString(16)).slice(-8);
   return hex.toUpperCase();
}

function licGetHWID() {
   var user = getEnvironmentVariable("USERNAME") || getEnvironmentVariable("USER") || "";
   var host = getEnvironmentVariable("COMPUTERNAME") || getEnvironmentVariable("HOSTNAME") || "";
   var raw  = (user + "_" + host).toUpperCase().replace(/[^A-Z0-9_]/g,"");
   if (raw.length >= 4) {
      if (!Settings.read(LIC_HWID_KEY, 13))
         Settings.write(LIC_HWID_KEY, 13, raw);
      return raw;
   }
   var stored = Settings.read(LIC_HWID_KEY, 13);
   if (stored && stored.length >= 4) return stored;
   var id = ""; var hx = "0123456789ABCDEF";
   for (var i = 0; i < 16; i++) id += hx[Math.floor(Math.random()*16)];
   Settings.write(LIC_HWID_KEY, 13, id);
   return id;
}

function licKeyForHWID(hwid) {
   var hash = licSHA256(hwid.trim().toUpperCase() + "|ASTROMAX-V1|" + LIC_SECRET);
   var groups = [];
   for (var i = 0; i < 20; i += 4) groups.push(hash.substring(i, i+4));
   return groups.join("-");
}

function licValidateKey(key) {
   if (!key) return false;
   var hwid = licGetHWID();
   var expected = licKeyForHWID(hwid);
   return key.trim().toUpperCase().replace(/\s/g,"") === expected.replace(/-/g,"").substring(0,20)
          || key.trim().toUpperCase() === expected;
}

function licTrialDaysLeft() {
   var stored = Settings.read(LIC_TRIAL_KEY, 13);
   if (stored === null || stored === undefined) {
      Settings.write(LIC_TRIAL_KEY, 13, new Date().getTime().toString());
      return LIC_TRIAL_DAYS;
   }
   var startMs = parseFloat(stored);
   if (isNaN(startMs)) {
      Settings.write(LIC_TRIAL_KEY, 13, new Date().getTime().toString());
      return LIC_TRIAL_DAYS;
   }
   return Math.max(0, Math.floor(LIC_TRIAL_DAYS - (new Date().getTime()-startMs)/86400000));
}

function licIsActivated() {
   var key = Settings.read(LIC_SETTINGS_KEY, 13);
   return licValidateKey(key);
}

function licCheck() {
   if (licIsActivated()) return "ok";
   var d = licTrialDaysLeft();
   return d > 0 ? "trial:" + d : "expired";
}

function licShowActivationDialog() {
   var hwid      = licGetHWID();
   var activated = licIsActivated();
   var daysLeft  = activated ? -1 : licTrialDaysLeft();

   var dlg = new Dialog();
   dlg.windowTitle = "AstroMax \u2014 License";
   dlg.userResizable = false;

   var statusTitleLbl = new Label(dlg);
   if (activated) {
      statusTitleLbl.text = "\u2705  License activated";
   } else if (daysLeft > 0) {
      statusTitleLbl.text = "\u23F3  Trial active \u2014 " + daysLeft + " day" + (daysLeft !== 1 ? "s" : "") + " remaining";
   } else {
      statusTitleLbl.text = "\u274C  Trial expired \u2014 activation required";
   }

   var msgLbl = new Label(dlg);
   msgLbl.text = "Send your HWID to the author together with proof of purchase.\nYou will receive a license key by email.";
   msgLbl.wordWrapping = true; msgLbl.minWidth = 380;

   var hwidLbl = new Label(dlg); hwidLbl.text = "Your HWID:";
   var hwidEdit = new Edit(dlg);
   hwidEdit.text = hwid; hwidEdit.readOnly = true; hwidEdit.minWidth = 380;
   hwidEdit.toolTip = "Select all and copy (Ctrl+A, Ctrl+C)";

   var keyLbl = new Label(dlg);
   keyLbl.text = activated ? "License key (activated):" : "Enter license key:";
   var keyEdit = new Edit(dlg); keyEdit.minWidth = 380;
   if (activated) {
      var storedKey = Settings.read(LIC_SETTINGS_KEY, 13);
      keyEdit.text = storedKey ? storedKey : "";
      keyEdit.readOnly = true;
   }

   var feedbackLbl = new Label(dlg);
   feedbackLbl.text = ""; feedbackLbl.minWidth = 380;

   var btnActivate = new PushButton(dlg);
   btnActivate.text = activated ? "  Re-activate  " : "  Activate  ";
   btnActivate.enabled = !activated;
   btnActivate.onClick = function() {
      var k = keyEdit.text.trim();
      if (licValidateKey(k)) {
         Settings.write(LIC_SETTINGS_KEY, 13, k);
         feedbackLbl.text = "\u2705  Activated successfully! Close and reopen the script.";
         btnActivate.enabled = false;
         keyEdit.readOnly = true;
      } else {
         feedbackLbl.text = "\u274C  Invalid key \u2014 make sure you sent the exact HWID above.";
      }
   };

   var btnClose = new PushButton(dlg); btnClose.text = "Close";
   btnClose.onClick = function() { dlg.ok(); };

   var btnRow = new Sizer(false); btnRow.spacing = 6;
   if (!activated) btnRow.add(btnActivate);
   btnRow.addStretch(); btnRow.add(btnClose);

   dlg.sizer = new Sizer(true); dlg.sizer.margin = 14; dlg.sizer.spacing = 8;
   dlg.sizer.add(statusTitleLbl); dlg.sizer.add(msgLbl);
   dlg.sizer.add(hwidLbl); dlg.sizer.add(hwidEdit);
   dlg.sizer.add(keyLbl);  dlg.sizer.add(keyEdit);
   dlg.sizer.add(feedbackLbl); dlg.sizer.add(btnRow);
   dlg.adjustToContents();
   return dlg.execute() === Dialog.Ok;
}

var VERSION = "1.3.0";
var G_TMP   = null;

// ============================================================
//  HELPERS
// ============================================================
function cloneImg(src) {
   var d = new Image(src.width, src.height, src.numberOfChannels,
                     src.colorSpace, src.bitsPerSample, src.sampleType);
   d.assign(src);
   return d;
}

function scaleImage(img, f) {
   var nw = Math.max(1, Math.round(img.width * f));
   var nh = Math.max(1, Math.round(img.height * f));
   var out = new Image(nw, nh, img.numberOfChannels,
                       img.colorSpace, img.bitsPerSample, img.sampleType);
   out.assign(img); out.resample(f);
   return out;
}

function ensureTmp(img) {
   if (G_TMP === null || G_TMP.isNull) {
      G_TMP = new ImageWindow(img.width, img.height,
         img.numberOfChannels, img.bitsPerSample, img.isReal,
         img.numberOfChannels > 1, "AstroMaxTmp");
      G_TMP.hide();
   }
}

function runHT(img, lo, mid, hi) {
   lo  = Math.max(0,        Math.min(0.98,  lo ));
   hi  = Math.max(lo+0.005, Math.min(1,     hi ));
   mid = Math.max(0.001,    Math.min(0.999, mid));
   ensureTmp(img);
   G_TMP.mainView.beginProcess(0);
   G_TMP.mainView.image.assign(img);
   G_TMP.mainView.endProcess();
   var ht = new HistogramTransformation;
   ht.H = [[lo,mid,hi,0,1],[lo,mid,hi,0,1],[lo,mid,hi,0,1],
            [0,0.5,1,0,1],[lo,mid,hi,0,1]];
   ht.executeOn(G_TMP.mainView);
   img.assign(G_TMP.mainView.image);
}

function normParams(img) {
   var med = img.median(), lo, range;
   if (med > 0.05) {
      lo = 0; range = 1.0;
   } else {
      var mad = img.MAD(); if (mad < 1e-7) mad = 0.001;
      var s = mad * 1.4826;
      lo    = Math.max(0, med - 2.8 * s);
      range = Math.min(1.0, med + 20.0 * s) - lo;
      if (range < 0.0001) range = 0.0001;
   }
   return { lo: lo, range: range };
}

// ── Auto-Stretch: statistically derives blackpoint + stretch ─
// Inverts HT midtone equation targeting sky background at ~15%.
// Works best on linear (unstretched) images.
// mode: 'nb'   → NB formula  (sigMult=8.0, scale=0.50)  — for Ha/SII/OIII compositions  → stretch ~9
//       'lrgb' → BB formula  (sigMult=0.5, scale=0.50)  — for L/R/G/B compositions       → stretch ~12
function autoStretchParams(img, mode) {
   var med   = img.median();
   var sigma = img.MAD() * 1.4826; if (sigma < 1e-5) sigma = 0.001;
   var nbMode  = (mode === 'nb');
   var sigMult = nbMode ? 8.0 : 0.5;
   var scale   = 0.50;   // both modes use the same scale — consistent with processImage
   var bkp        = Math.max(0, med - sigMult * sigma);
   var bkpSlider  = Math.min(0.10, bkp / scale);
   var actualClip = bkpSlider * scale;
   var x = (med - actualClip) / Math.max(1e-5, 1.0 - actualClip);
   var m = Math.max(0.001, Math.min(0.49, 0.85 * x / (0.7 * x + 0.15)));
   var stretchSlider = Math.max(0, Math.min(30,
      (Math.log(1.0 / m) / Math.LN2 - 1.0) / 0.35));
   return { blackpoint: bkpSlider, stretch: stretchSlider };
}

// ── Luma-preserving saturation ───────────────────────────────
// factor: 0=greyscale, 1=original, >1=boosted
function applySaturation(img, factor) {
   if (img.numberOfChannels < 3) return;
   var w=img.width, h=img.height, np=w*h;
   var rect=new Rect(0,0,w,h);
   var bR=new Float32Array(np), bG=new Float32Array(np), bB=new Float32Array(np);
   img.getSamples(bR,rect,0); img.getSamples(bG,rect,1); img.getSamples(bB,rect,2);
   for (var i=0; i<np; i++) {
      var lum=0.2126*bR[i]+0.7152*bG[i]+0.0722*bB[i];
      bR[i]=Math.min(1,Math.max(0,lum+(bR[i]-lum)*factor));
      bG[i]=Math.min(1,Math.max(0,lum+(bG[i]-lum)*factor));
      bB[i]=Math.min(1,Math.max(0,lum+(bB[i]-lum)*factor));
   }
   img.setSamples(bR,rect,0); img.setSamples(bG,rect,1); img.setSamples(bB,rect,2);
}

// ── Sky Smooth: background noise reduction ───────────────────
function applySkySmooth(img, amount) {
   if (amount <= 0.001) return;
   var sigma = amount * 2.5;
   var thr   = 0.25;
   ensureTmp(img);
   G_TMP.mainView.beginProcess(0);
   G_TMP.mainView.image.assign(img);
   G_TMP.mainView.endProcess();
   try {
      var conv = new Convolution;
      conv.mode  = 0;
      conv.sigma = sigma;
      conv.executeOn(G_TMP.mainView, false);
   } catch(e) { return; }
   var blurred = G_TMP.mainView.image;
   var w=img.width, h=img.height, np=w*h;
   var rect=new Rect(0,0,w,h);
   for (var c=0; c<img.numberOfChannels; c++) {
      var bO=new Float32Array(np), bB=new Float32Array(np);
      img.getSamples(bO,rect,c);
      blurred.getSamples(bB,rect,c);
      for (var i=0; i<np; i++) {
         var v=bO[i];
         var t=Math.max(0,Math.min(1,(v-0.70*thr)/(0.30*thr)));
         bO[i]=t*v+(1-t)*bB[i];
      }
      img.setSamples(bO,rect,c);
   }
}

// ── Soft highlight roll-off (star protection) ────────────────
// protect=0: no effect; protect=1: pixels above 0.75 are soft-clipped.
function applyStarProtection(img, protect) {
   var threshold = 1.0 - protect * 0.25;
   var maxExcess = 1.0 - threshold;
   var w=img.width, h=img.height, np=w*h;
   var rect=new Rect(0,0,w,h);
   var nch=img.numberOfChannels;
   var bufs=[];
   for (var c=0; c<nch; c++) {
      var b=new Float32Array(np); img.getSamples(b,rect,c); bufs.push(b);
   }
   for (var i=0; i<np; i++) {
      for (var c=0; c<nch; c++) {
         var v=bufs[c][i];
         if (v>threshold)
            bufs[c][i]=threshold+(v-threshold)/(1.0+(v-threshold)/maxExcess*3.0*protect);
      }
   }
   for (var c=0; c<nch; c++) img.setSamples(bufs[c],rect,c);
}

// ── Presets ──────────────────────────────────────────────────
var MONO_PRESET_PREFIX = "/AstroMax/Presets/Mono/";
var MONO_PRESET_LIST   = "/AstroMax/PresetList/Mono";

function monoPresetNames() {
   var list = Settings.read(MONO_PRESET_LIST, 13) || "";
   var raw = list ? list.split("|") : [];
   var result = [];
   for (var i=0; i<raw.length; i++) if (raw[i].length>0) result.push(raw[i]);
   return result;
}

function monoSavePreset(name, p) {
   var data = JSON.stringify({
      blackpoint:p.blackpoint, stretch:p.stretch, contrast:p.contrast,
      background:p.background, midtones:p.midtones, highlights:p.highlights,
      saturation:p.saturation, starProtect:p.starProtect, skySmooth:p.skySmooth,
      composeMode:p.composeMode,
      nbPalette:p.nbPalette, nbScnr:p.nbScnr, nbOiiiBoost:p.nbOiiiBoost,
      nbSiiBoost:p.nbSiiBoost, nbHaBlend:p.nbHaBlend, nbHaLum:p.nbHaLum
   });
   Settings.write(MONO_PRESET_PREFIX + name, 13, data);
   var names = monoPresetNames();
   var found = false;
   for (var i=0; i<names.length; i++) if (names[i]===name) { found=true; break; }
   if (!found) names.push(name);
   Settings.write(MONO_PRESET_LIST, 13, names.join("|"));
}

function monoLoadPreset(name) {
   var json = Settings.read(MONO_PRESET_PREFIX + name, 13);
   if (!json || json.length===0) return null;
   try { return JSON.parse(json); } catch(e) { return null; }
}

function monoDeletePreset(name) {
   Settings.write(MONO_PRESET_PREFIX + name, 13, "");
   var names = monoPresetNames();
   var filtered = [];
   for (var i=0; i<names.length; i++) if (names[i]!==name) filtered.push(names[i]);
   Settings.write(MONO_PRESET_LIST, 13, filtered.join("|"));
}

// ── Render helpers ───────────────────────────────────────────
function sampleBilinear(img,fx,fy,c){
   var w=img.width,h=img.height;
   var x0=Math.max(0,Math.min(w-2,Math.floor(fx)));
   var y0=Math.max(0,Math.min(h-2,Math.floor(fy)));
   var tx=fx-x0,ty=fy-y0;
   return img.sample(x0,y0,c)*(1-tx)*(1-ty)
         +img.sample(x0+1,y0,c)*tx*(1-ty)
         +img.sample(x0,y0+1,c)*(1-tx)*ty
         +img.sample(x0+1,y0+1,c)*tx*ty;
}

function toU8(v,lo,range){
   return Math.min(255,Math.max(0,Math.round((v-lo)/range*255)));
}

function renderFull(img, W, H) {
   var scale = Math.min(W / img.width, H / img.height);
   var dw    = Math.max(1, Math.round(img.width  * scale));
   var dh    = Math.max(1, Math.round(img.height * scale));
   var sc    = scaleImage(img, scale);
   var n     = normParams(img);
   var bmp   = new Bitmap(dw, dh);
   var ch    = sc.numberOfChannels;
   for (var y = 0; y < dh; y++) {
      for (var x = 0; x < dw; x++) {
         var r, g, b;
         if (ch === 1) { var v=Math.min(1,Math.max(0,(sc.sample(x,y,0)-n.lo)/n.range)); r=g=b=Math.round(v*255); }
         else { r=toU8(sc.sample(x,y,0),n.lo,n.range); g=toU8(sc.sample(x,y,1),n.lo,n.range); b=toU8(sc.sample(x,y,2),n.lo,n.range); }
         bmp.setPixel(x, y, (0xFF<<24)|(r<<16)|(g<<8)|b);
      }
   }
   return bmp;
}

function renderZoom(img,cx,cy,level,W,H){
   var cw=1.0/level,ch=1.0/level;
   var x0=Math.max(0,Math.min(1-cw,cx-cw/2));
   var y0=Math.max(0,Math.min(1-ch,cy-ch/2));
   var sw=img.width,sh=img.height;
   var n=normParams(img);
   var bmp=new Bitmap(W,H);
   var ich=img.numberOfChannels;
   for(var py=0;py<H;py++){
      var fy=(y0+py/H*ch)*sh-0.5;
      for(var px=0;px<W;px++){
         var fx=(x0+px/W*cw)*sw-0.5;
         var r,g,b;
         if(ich===1){var v=Math.min(1,Math.max(0,(sampleBilinear(img,fx,fy,0)-n.lo)/n.range));r=g=b=Math.round(v*255);}
         else{r=toU8(sampleBilinear(img,fx,fy,0),n.lo,n.range);
              g=toU8(sampleBilinear(img,fx,fy,1),n.lo,n.range);
              b=toU8(sampleBilinear(img,fx,fy,2),n.lo,n.range);}
         bmp.setPixel(px,py,(0xFF<<24)|(r<<16)|(g<<8)|b);
      }
   }
   return bmp;
}

// ============================================================
//  COMPOSE
// ============================================================
function composeChannels(vR, vG, vB, vL) {
   var imgR = vR.image, imgG = vG.image, imgB = vB.image;
   var w = imgR.width, h = imgR.height, n = w * h;

   Console.writeln("Compose: R=" + vR.id + "  G=" + vG.id + "  B=" + vB.id);
   Console.writeln("Dimenzije: " + w + " x " + h);

   var out = new ImageWindow(w, h, 3, 32, true, true, "AstroMaxCompose");
   out.hide();
   out.mainView.beginProcess(0);
   var outImg = out.mainView.image;

   var rect = new Rect(0, 0, w, h);
   var buf  = new Float32Array(n);

   imgR.getSamples(buf, rect, 0); outImg.setSamples(buf, rect, 0);
   imgG.getSamples(buf, rect, 0); outImg.setSamples(buf, rect, 1);
   imgB.getSamples(buf, rect, 0); outImg.setSamples(buf, rect, 2);

   if (vL !== undefined && vL !== null) {
      Console.writeln("Applying L as Luminance...");
      var imgL = vL.image;
      var np2  = w * h;
      var bufL = new Float32Array(np2);
      var lRect = new Rect(0, 0, w, h);

      if (imgL.width === w && imgL.height === h) {
         imgL.getSamples(bufL, lRect, 0);
      } else {
         var sf = Math.min(w / imgL.width, h / imgL.height);
         var lScl = scaleImage(imgL, sf);
         var lr2 = new Rect(0, 0, Math.min(w, lScl.width), Math.min(h, lScl.height));
         lScl.getSamples(bufL, lr2, 0);
      }

      var bR = new Float32Array(np2), bG = new Float32Array(np2), bB = new Float32Array(np2);
      outImg.getSamples(bR, lRect, 0);
      outImg.getSamples(bG, lRect, 1);
      outImg.getSamples(bB, lRect, 2);

      var step = 64, subLum2 = [], subL2 = [];
      for (var i = 0; i < np2; i += step) {
         subLum2.push(0.2126*bR[i] + 0.7152*bG[i] + 0.0722*bB[i]);
         subL2.push(bufL[i]);
      }
      subLum2.sort(function(a,b){return a-b;});
      subL2.sort(function(a,b){return a-b;});
      var mLum = subLum2[Math.floor(subLum2.length/2)];
      var mL   = subL2[Math.floor(subL2.length/2)];
      var sc2  = (mL > 1e-6) ? mLum / mL : 1.0;

      for (var i = 0; i < np2; i++) {
         var lv  = Math.min(1.0, bufL[i] * sc2);
         var lum = 0.2126*bR[i] + 0.7152*bG[i] + 0.0722*bB[i];
         if (lum > 1e-6) {
            var f = Math.min(2.0, lv / lum);
            bR[i] = Math.min(1.0, bR[i] * f);
            bG[i] = Math.min(1.0, bG[i] * f);
            bB[i] = Math.min(1.0, bB[i] * f);
         }
      }
      outImg.setSamples(bR, lRect, 0);
      outImg.setSamples(bG, lRect, 1);
      outImg.setSamples(bB, lRect, 2);
      Console.writeln("L Luminance applied.");
   }

   out.mainView.endProcess();
   Console.writeln("Compose gotov.");
   return out;
}

// ============================================================
//  EQUALIZE CHANNELS
//  FIX: factor capped at 5x to prevent noise amplification on weak channels
// ============================================================
function equalizeChannels(img) {
   var n = img.numberOfChannels;
   if (n < 2) return;

   var w  = img.width, h = img.height, np = w * h;
   var rect = new Rect(0, 0, w, h);
   var buf  = new Float32Array(np);

   var medians = [];
   for (var c = 0; c < n; c++) {
      img.getSamples(buf, rect, c);
      var step = 64, sub = [];
      for (var i = 0; i < np; i += step) sub.push(buf[i]);
      sub.sort(function(a, b) { return a - b; });
      medians.push(sub[Math.floor(sub.length / 2)]);
   }

   var maxMed = medians[0];
   for (var c = 1; c < n; c++)
      if (medians[c] > maxMed) maxMed = medians[c];

   Console.writeln("Equalize: mediani R=" + medians[0].toFixed(6) +
                   "  G=" + medians[1].toFixed(6) +
                   "  B=" + medians[2].toFixed(6) +
                   "  \u2192 referenca=" + maxMed.toFixed(6));

   if (maxMed < 1e-8) { Console.writeln("Equalize: svi kanali crni, preskačem."); return; }

   for (var c = 0; c < n; c++) {
      if (medians[c] < 1e-8) continue;
      var factor = Math.min(5.0, maxMed / medians[c]);   // cap at 5x — prevents noise explosion
      if (Math.abs(factor - 1.0) < 0.0001) continue;

      Console.writeln("  Ch " + c + ": x" + factor.toFixed(4));
      img.getSamples(buf, rect, c);
      for (var i = 0; i < np; i++) buf[i] = Math.min(1.0, buf[i] * factor);
      img.setSamples(buf, rect, c);
   }
   Console.writeln("Equalize gotov.");
}

// ============================================================
//  NARROWBAND NORMALISATION
// ============================================================
function applyNarrowbandNorm(img, p) {
   var roles = [
      [ 0,  1, -1],  // HOO
      [ 1,  2,  0],  // SHO (Hubble)
      [ 0,  2,  1],  // HSO
      [ 0,  1,  2]   // HOS
   ];
   var role   = roles[p.nbPalette - 1] || roles[0];
   var chHa   = role[0], chOIII = role[1], chSII = role[2];

   var w = img.width, h = img.height, np = w * h;
   var rect = new Rect(0, 0, w, h);
   var bufR = new Float32Array(np), bufG = new Float32Array(np), bufB = new Float32Array(np);
   img.getSamples(bufR, rect, 0);
   img.getSamples(bufG, rect, 1);
   img.getSamples(bufB, rect, 2);
   var bufs = [bufR, bufG, bufB];

   function chanMedian(buf) {
      var step = 64, sub = [];
      for (var i = 0; i < np; i += step) sub.push(buf[i]);
      sub.sort(function(a,b){return a-b;});
      return sub[Math.floor(sub.length/2)];
   }

   function emissionBoost(buf, boost) {
      if (Math.abs(boost - 1.0) < 0.001) return;
      var bg = chanMedian(buf);
      for (var i = 0; i < np; i++) {
         var em = buf[i] - bg;
         if (em > 0) buf[i] = Math.min(1.0, bg + em * boost);
      }
   }

   if (chOIII >= 0) {
      emissionBoost(bufs[chOIII], p.nbOiiiBoost);
      if (p.nbPalette === 1) emissionBoost(bufB, p.nbOiiiBoost);
   }
   if (chSII >= 0) emissionBoost(bufs[chSII], p.nbSiiBoost);

   if (p.nbHaBlend > 0.001 && chOIII >= 0) {
      var haArr = bufs[chHa], oiiiArr = bufs[chOIII];
      for (var i = 0; i < np; i++)
         haArr[i] = haArr[i] * (1.0 - p.nbHaBlend) + oiiiArr[i] * p.nbHaBlend;
   }

   if (p.nbScnr > 0.001) {
      var haB = bufs[chHa];
      for (var i = 0; i < np; i++) {
         var r = bufR[i], g = bufG[i], b = bufB[i];
         var lum = 0.2126*r + 0.7152*g + 0.0722*b;
         var protect = lum > 0.7 ? 1.0 : (lum > 0.4 ? (lum - 0.4) / 0.3 : 0.0);
         var eff = p.nbScnr * (1.0 - protect);
         if (eff > 0.001) {
            var minOther;
            if      (chHa === 0) minOther = Math.min(g, b);
            else if (chHa === 1) minOther = Math.min(r, b);
            else                 minOther = Math.min(r, g);
            haB[i] = Math.max(0, haB[i] - eff * minOther);
         }
      }
   }

   if (p.nbHaLum) {
      var haB2 = bufs[chHa];
      for (var i = 0; i < np; i++) {
         var lum = 0.2126*bufR[i] + 0.7152*bufG[i] + 0.0722*bufB[i];
         if (lum > 1e-6) {
            var f = Math.min(2.0, haB2[i] / lum);
            bufR[i] = Math.min(1.0, bufR[i] * f);
            bufG[i] = Math.min(1.0, bufG[i] * f);
            bufB[i] = Math.min(1.0, bufB[i] * f);
         }
      }
   }

   img.setSamples(bufR, rect, 0);
   img.setSamples(bufG, rect, 1);
   img.setSamples(bufB, rect, 2);
}

// ============================================================
//  PROCESS IMAGE
//  FIX: highlights lo is now dynamic (was hardcoded 0.6)
//  NEW: star protection as final step
// ============================================================
function processImage(src, p) {
   var img = cloneImg(src);
   var nbActive = p.nbPalette > 0;
   if (nbActive) applyNarrowbandNorm(img, p);
   if (p.blackpoint > 0) {
      runHT(img, p.blackpoint * 0.50, 0.5, 1);
   }
   if (p.stretch > 0) {
      var m = Math.pow(2, -(1 + p.stretch * 0.35));
      runHT(img, 0, Math.max(0.001, Math.min(0.49, m)), 1);
   }
   if (p.contrast !== 0) {
      var lo = p.contrast > 0 ? p.contrast * 0.03 : 0;
      var hi = p.contrast > 0 ? 1 : 1 + p.contrast * 0.03;
      runHT(img, lo, 0.5, hi);
   }
   if (p.background !== 0) {
      var blo = p.background < 0 ? -p.background * 0.04 : 0;
      var bhi = p.background > 0 ? 1 - p.background * 0.04 : 1;
      runHT(img, blo, 0.5, bhi);
   }
   if (Math.abs(p.midtones - 0.5) > 0.001) {
      var mMid = 1.0 - p.midtones;
      runHT(img, 0, Math.max(0.05, Math.min(0.95, mMid)), 1);
   }
   if (p.highlights < 0.49) {
      img.invert();
      var hStr = (0.5 - p.highlights) * 3.0;
      runHT(img, 0, Math.max(0.05, Math.min(0.45, 0.5 - hStr*0.08)), 1);
      img.invert();
   } else if (p.highlights > 0.51) {
      var hStr2 = (p.highlights - 0.5) * 3.0;
      var hLo = Math.min(0.45, hStr2 * 0.12);   // dynamic lo — prevents aggressive clip at 0.6
      runHT(img, hLo, Math.max(0.05, Math.min(0.45, 0.5 - hStr2*0.08)), 1);
   }
   if (p.saturation !== undefined && Math.abs(p.saturation - 1.0) > 0.002)
      applySaturation(img, p.saturation);
   if (p.starProtect !== undefined && p.starProtect > 0.001)
      applyStarProtection(img, p.starProtect);
   if (p.skySmooth !== undefined && p.skySmooth > 0.001)
      applySkySmooth(img, p.skySmooth);
   return img;
}

// ============================================================
//  DIALOG
// ============================================================
function EasyStretchMonoDialog() {
   this.__base__ = Dialog;
   this.__base__();
   this.windowTitle = "AstroMax Easy Stretch Mono v" + VERSION;
   this.userResizable = true;

   var self = this;

   var windows = ImageWindow.windows;
   this.views  = [];
   for (var i = 0; i < windows.length; i++) {
      var w = windows[i];
      if (!w.isNull && !w.mainView.isNull
          && w.mainView.id.indexOf("_esm_") < 0
          && w.mainView.id.indexOf("AstroMax") < 0)
         this.views.push(w.mainView);
   }

   this.composedWin   = null;
   this.origImg       = null;
   this.previewImg    = null;
   this.lastRes       = null;
   this.previewBitmap = null;
   this.appliedLayers = 0;
   this.busy          = false;
   this.zoomMode  = false;
   this.zoomCX    = 0.5; this.zoomCY = 0.5;
   this.zoomLevel = 4;
   this.dragStart = null; this.dragRect = null;

   this.p = { blackpoint:0, stretch:5, contrast:0,
              background:0, midtones:0.5, highlights:0.5,
              saturation:1.0, starProtect:0, skySmooth:0, composeMode:'nb',
              nbPalette:0, nbScnr:0, nbOiiiBoost:1.0, nbSiiBoost:1.0, nbHaBlend:0, nbHaLum:false };

   var SCALE = 0.25;

   // ── Canvas ───────────────────────────────────────────────
   var PW = 680, PH = 500;
   this.PW = PW; this.PH = PH;

   this.canvas = new Control(this);
   this.canvas.setMinSize(PW, PH);
   this.canvas.onResize = function(wNew, hNew) {
      self.PW = wNew; self.PH = hNew;
      if (self.lastRes !== null) self.renderPreview();
      else self.canvas.repaint();
   };
   this.canvas.onPaint = function() {
      var g  = new VectorGraphics(self.canvas);
      var cw = self.canvas.width, ch = self.canvas.height;
      g.fillRect(0, 0, cw, ch, new Brush(0xFF111111));
      if (self.previewBitmap !== null) {
         var bw = self.previewBitmap.width, bh = self.previewBitmap.height;
         var ox = Math.max(0, Math.round((cw-bw)/2));
         var oy = Math.max(0, Math.round((ch-bh)/2));
         g.drawBitmap(ox, oy, self.previewBitmap);
         if (!self.zoomMode && self.dragRect !== null) {
            g.pen = new Pen(0xFFFFFF00, 1);
            g.drawRect(self.dragRect.x, self.dragRect.y,
                       self.dragRect.x+self.dragRect.w, self.dragRect.y+self.dragRect.h);
         }
         if (self.zoomMode) {
            g.pen = new Pen(0xFFFFFF88, 1);
            g.drawText(8, 18, "Zoom " + self.zoomLevel + "x  \u2014  click 'Reset Zoom' to go back");
         }
      } else {
         g.pen = new Pen(0xFF777777, 1);
         g.drawText(cw/2 - 150, ch/2, "Izaberi kanale i klikni Compose & Preview");
      }
      g.end();
   };

   this.canvas.onMousePress = function(x, y, btn) {
      if (self.zoomMode) return;
      self.dragStart = {x:x, y:y}; self.dragRect = null;
   };
   this.canvas.onMouseMove = function(x, y, btn) {
      if (self.dragStart === null || self.zoomMode) return;
      self.dragRect = {x:Math.min(self.dragStart.x,x), y:Math.min(self.dragStart.y,y),
                       w:Math.abs(x-self.dragStart.x), h:Math.abs(y-self.dragStart.y)};
      self.canvas.repaint();
   };
   this.canvas.onMouseRelease = function(x, y, btn) {
      if (self.zoomMode || self.dragStart === null) return;
      if (self.dragRect !== null && self.dragRect.w > 15 && self.dragRect.h > 15 && self.previewBitmap !== null) {
         var bw = self.previewBitmap.width, bh = self.previewBitmap.height;
         var ox = Math.max(0, Math.round((self.canvas.width-bw)/2));
         var oy = Math.max(0, Math.round((self.canvas.height-bh)/2));
         var rx = (self.dragRect.x-ox)/bw, ry = (self.dragRect.y-oy)/bh;
         var rw = self.dragRect.w/bw,      rh = self.dragRect.h/bh;
         self.zoomCX = Math.max(0, Math.min(1, rx+rw/2));
         self.zoomCY = Math.max(0, Math.min(1, ry+rh/2));
         var avg = (rw+rh)/2;
         self.zoomLevel = 2;
         self.btnZoomReset.enabled = true; self.zoomMode = true;
         self.updateLevelButtons(); self.renderPreview();
      }
      self.dragStart = null; self.dragRect = null;
   };

   // ── Helpers ──────────────────────────────────────────────
   function mkCombo(labelTxt, lblW) {
      var lbl = new Label(self); lbl.text = labelTxt; lbl.minWidth = lblW || 60;
      var cmb = new ComboBox(self);
      cmb.addItem("-- None --");
      for (var v = 0; v < self.views.length; v++) cmb.addItem(self.views[v].id);
      var row = new Sizer(false); row.spacing = 6;
      row.add(lbl); row.add(cmb); row.addStretch();
      return { row: row, cmb: cmb, lbl: lbl };
   }

   function mkSlider(lbl, lo, hi, def, prec, key) {
      var label = new Label(self); label.text = lbl + ":"; label.minWidth = 180;
      var sld   = new Slider(self); sld.minWidth = 190; sld.setRange(0, 500);
      var edt   = new Edit(self);   edt.readOnly = true; edt.minWidth = 62; edt.maxWidth = 62;
      function v2s(v) { return Math.round((v-lo)/(hi-lo)*500); }
      function s2v(s) { return lo + s/500*(hi-lo); }
      sld.value = v2s(def); edt.text = def.toFixed(prec);
      sld.onValueUpdated = function(s) {
         var v = parseFloat(s2v(s).toFixed(prec));
         edt.text = v.toFixed(prec); self.p[key] = v; self.doRefresh();
      };
      var row = new Sizer(false); row.spacing = 4;
      row.add(label); row.add(sld); row.add(edt);
      row.setValue = function(v) { edt.text = v.toFixed(prec); sld.value = v2s(v); self.p[key] = v; };
      return row;
   }

   function mkGroup(t) {
      var g = new GroupBox(self); g.title = t;
      g.sizer = new Sizer(true); g.sizer.margin = 6; g.sizer.spacing = 5;
      return g;
   }

   // ── Zoom controls ────────────────────────────────────────
   var zHint = new Label(this); zHint.text = "Drag on preview to zoom  \u00B7  Release slider to update";
   this.btnZoomReset = new PushButton(this);
   this.btnZoomReset.text = "\u229F  Reset Zoom"; this.btnZoomReset.enabled = false;
   this.btnZoomReset.onClick = function() {
      self.zoomMode = false; self.btnZoomReset.enabled = false;
      self.updateLevelButtons(); self.renderPreview();
   };
   var zLbl = new Label(this); zLbl.text = "Level:";
   this.btnZ2 = new PushButton(this); this.btnZ2.text = "2x"; this.btnZ2.minWidth = 36;
   this.btnZ4 = new PushButton(this); this.btnZ4.text = "4x"; this.btnZ4.minWidth = 36;
   this.btnZ8 = new PushButton(this); this.btnZ8.text = "8x"; this.btnZ8.minWidth = 36;
   this.btnZ2.onClick = function() { self.zoomLevel=2; if(self.zoomMode) self.renderPreview(); };
   this.btnZ4.onClick = function() { self.zoomLevel=4; if(self.zoomMode) self.renderPreview(); };
   this.btnZ8.onClick = function() { self.zoomLevel=8; if(self.zoomMode) self.renderPreview(); };
   var zRow = new Sizer(false); zRow.spacing = 6;
   zRow.add(zHint); zRow.addStretch();
   zRow.add(this.btnZoomReset); zRow.add(zLbl);
   zRow.add(this.btnZ2); zRow.add(this.btnZ4); zRow.add(this.btnZ8);

   // ── Group 1 · Channel Composition ────────────────────────
   var gCompose = mkGroup("1 \u00B7 Channel Composition");

   // ── Left sub-group: LRGB ─────────────────────────────────────
   var gLRGB = new GroupBox(this); gLRGB.title = "LRGB";
   gLRGB.sizer = new Sizer(true); gLRGB.sizer.margin = 4; gLRGB.sizer.spacing = 3;

   this.chL = mkCombo("L (opt):", 70);
   this.chR = mkCombo("R:",       70);
   this.chG = mkCombo("G:",       70);
   this.chB = mkCombo("B:",       70);

   gLRGB.sizer.add(this.chL.row);
   gLRGB.sizer.add(this.chR.row);
   gLRGB.sizer.add(this.chG.row);
   gLRGB.sizer.add(this.chB.row);

   // ── Right sub-group: Narrowband ───────────────────────────────
   var gNB = new GroupBox(this); gNB.title = "Narrowband  (palette order \u2191 from Sect.3)";
   gNB.sizer = new Sizer(true); gNB.sizer.margin = 4; gNB.sizer.spacing = 3;

   this.chHa   = mkCombo("Ha:",   70);
   this.chSII  = mkCombo("SII:",  70);
   this.chOIII = mkCombo("OIII:", 70);

   gNB.sizer.add(this.chHa.row);
   gNB.sizer.add(this.chSII.row);
   gNB.sizer.add(this.chOIII.row);

   // ── Side-by-side layout ───────────────────────────────────────
   var composeRow = new Sizer(false); composeRow.spacing = 8;
   composeRow.add(gLRGB); composeRow.add(gNB);

   this.btnCompose = new PushButton(this);
   this.btnCompose.text = "\u26A1  Compose & Preview";
   this.btnCompose.toolTip = "LRGB: izaberi R/G/B kanale lijevo.\n" +
                             "Narrowband: izaberi Ha/SII/OIII desno — redoslijed RGB odredjuje Palette u Sect.3.\n" +
                             "Ako su oba panela popunjena, Narrowband ima prednost.";
   this.btnCompose.minHeight = 30;
   this.btnCompose.onClick = function() {
      Console.show();
      try {
         var iHa   = self.chHa.cmb.currentItem   - 1;
         var iSII  = self.chSII.cmb.currentItem  - 1;
         var iOIII = self.chOIII.cmb.currentItem - 1;
         var nbActive = (iHa >= 0 || iSII >= 0 || iOIII >= 0);

         if (self.composedWin && !self.composedWin.isNull) self.composedWin.forceClose();
         if (G_TMP && !G_TMP.isNull) { G_TMP.forceClose(); G_TMP = null; }

         if (nbActive) {
            // ── NB composition: palette determines RGB mapping ──
            var vHa   = (iHa   >= 0) ? self.views[iHa]   : null;
            var vSII  = (iSII  >= 0) ? self.views[iSII]  : null;
            var vOIII = (iOIII >= 0) ? self.views[iOIII] : null;
            var fallback = vHa || vSII || vOIII;
            var vR, vG, vB;
            var pal = self.p.nbPalette;
            if      (pal === 2) { vR=vSII||fallback; vG=vHa||fallback;  vB=vOIII||fallback; } // SHO
            else if (pal === 1) { vR=vHa||fallback;  vG=vOIII||fallback; vB=vOIII||fallback; } // HOO
            else if (pal === 3) { vR=vHa||fallback;  vG=vSII||fallback;  vB=vOIII||fallback; } // HSO
            else if (pal === 4) { vR=vHa||fallback;  vG=vOIII||fallback; vB=vSII||fallback;  } // HOS
            else                { vR=vHa||fallback;  vG=vSII||fallback;  vB=vOIII||fallback; } // None
            if (!vR || !vG || !vB) { Console.criticalln("Izaberi barem jedan NB kanal."); return; }
            Console.writeln("NB Compose (" + ["None","HOO","SHO","HSO","HOS"][pal] + "): R=" + vR.id + " G=" + vG.id + " B=" + vB.id);
            self.composedWin = composeChannels(vR, vG, vB, null);
            self.p.composeMode = 'nb';
         } else {
            // ── LRGB composition ────────────────────────────────
            var iR = self.chR.cmb.currentItem - 1;
            var iG = self.chG.cmb.currentItem - 1;
            var iB = self.chB.cmb.currentItem - 1;
            var iL = self.chL.cmb.currentItem - 1;
            if (iR < 0 || iG < 0 || iB < 0) { Console.criticalln("Za LRGB izaberi R, G i B kanale."); return; }
            Console.writeln("LRGB Compose: R=" + self.views[iR].id + " G=" + self.views[iG].id + " B=" + self.views[iB].id);
            var vL2 = (iL >= 0) ? self.views[iL] : null;
            self.composedWin = composeChannels(self.views[iR], self.views[iG], self.views[iB], vL2);
            self.p.composeMode = 'lrgb';
         }

         Console.writeln("Composing..."); processEvents();
         self.origImg = cloneImg(self.composedWin.mainView.image);
         Console.writeln("Equalizing channels...");
         equalizeChannels(self.origImg);
         self.previewImg = scaleImage(self.origImg, SCALE);
         self.appliedLayers = 0;
         self.windowTitle   = "AstroMax Easy Stretch Mono v" + VERSION;
         var nPW = 680;
         var nPH = Math.round(nPW * self.origImg.height / self.origImg.width);
         if (nPH > 520) { nPH = 520; nPW = Math.round(nPH * self.origImg.width / self.origImg.height); }
         self.PW = nPW; self.PH = nPH;
         self.canvas.setMinSize(nPW, nPH);
         self.adjustToContents();
         ensureTmp(self.previewImg);
         Console.writeln("Compose gotov. Mode: " + self.p.composeMode);
         self.doRefresh();
         Console.hide();
      } catch(e) {
         Console.criticalln("Gre\u0161ka u Compose: " + e);
      }
   };

   gCompose.sizer.add(composeRow);
   gCompose.sizer.add(this.btnCompose);

   // ── Group 2 · Stretch & Adjust ────────────────────────────
   var gStretch = mkGroup("2 \u00B7 Stretch & Adjust");
   this.slBlackpoint = mkSlider("Blackpoint",      0,  1, 0,  3, "blackpoint");
   this.slStretch    = mkSlider("General Stretch", 0, 30, 5,  2, "stretch"   );
   this.slContrast   = mkSlider("Contrast",       -8,  8, 0,  2, "contrast"  );
   this.slBackground = mkSlider("Background",     -3,  3, 0,  3, "background");
   this.slMidtones   = mkSlider("Midtones  (L=dark R=light)", 0.02, 0.98, 0.5, 3, "midtones"  );
   this.slHighlights = mkSlider("Highlights (L=dark R=light)", 0.2,  0.8,  0.5, 3, "highlights");
   this.slSaturation  = mkSlider("Saturation (0=grey 1=orig)",  0,    2.5,  1.0, 2, "saturation" );
   this.slStarProtect = mkSlider("Star Protection",             0,    1,    0,   2, "starProtect");
   this.slSkySmooth   = mkSlider("Sky Smooth (0=off 1=max)",    0,    1,    0,   2, "skySmooth"  );

   var btnAutoStretch = new PushButton(this);
   btnAutoStretch.text = "\u26A1  Auto Stretch";
   btnAutoStretch.toolTip = "Statistically compute Blackpoint + Stretch to place sky at ~15%.\n" +
                            "Optimised for narrowband and composed NB images (SHO/HOO).\n" +
                            "Works best on linear (unstretched) images after Compose.";
   btnAutoStretch.onClick = function() {
      if (!self.previewImg) return;
      var params = autoStretchParams(self.previewImg, self.p.composeMode);
      self.slBlackpoint.setValue(params.blackpoint);
      self.slStretch.setValue(params.stretch);
      self.doRefresh();
   };
   var autoRow = new Sizer(false); autoRow.spacing = 6;
   autoRow.addStretch(); autoRow.add(btnAutoStretch);

   gStretch.sizer.add(this.slBlackpoint);
   gStretch.sizer.add(this.slStretch);
   gStretch.sizer.add(this.slContrast);
   gStretch.sizer.add(this.slBackground);
   gStretch.sizer.add(this.slMidtones);
   gStretch.sizer.add(this.slHighlights);
   gStretch.sizer.add(this.slSaturation);
   gStretch.sizer.add(this.slStarProtect);
   gStretch.sizer.add(this.slSkySmooth);
   gStretch.sizer.add(autoRow);

   // ── Group 3 · Narrowband Normalisation ───────────────────
   var gNarrow = mkGroup("3 \u00B7 Narrowband Normalisation");

   var palLbl = new Label(this); palLbl.text = "Palette:"; palLbl.minWidth = 180;
   this.nbPalCmb = new ComboBox(this);
   this.nbPalCmb.addItem("-- None --  (skip normalisation)");
   this.nbPalCmb.addItem("HOO  (Ha\u2192R, OIII\u2192G+B)");
   this.nbPalCmb.addItem("SHO  (SII\u2192R, Ha\u2192G, OIII\u2192B)  Hubble");
   this.nbPalCmb.addItem("HSO  (Ha\u2192R, SII\u2192G, OIII\u2192B)");
   this.nbPalCmb.addItem("HOS  (Ha\u2192R, OIII\u2192G, SII\u2192B)");
   this.nbPalCmb.currentItem = 0;
   this.nbPalCmb.onItemSelected = function(idx) { self.p.nbPalette = idx; self.doRefresh(); };
   var palRow = new Sizer(false); palRow.spacing = 6;
   palRow.add(palLbl); palRow.add(this.nbPalCmb); palRow.addStretch();

   this.slScnr      = mkSlider("SCNR (green reduction)",    0,   1,   0.0, 2, "nbScnr");
   this.slOiiiBoost = mkSlider("OIII boost",                0.5, 3.0, 1.0, 2, "nbOiiiBoost");
   this.slSiiBoost  = mkSlider("SII boost",                 0.5, 3.0, 1.0, 2, "nbSiiBoost");
   this.slHaBlend   = mkSlider("Synthetic green (OIII\u2192Ha)", 0, 1, 0.0, 2, "nbHaBlend");

   var haLumLbl = new Label(this); haLumLbl.text = "Ha as Luminance:"; haLumLbl.minWidth = 180;
   this.chkHaLum = new CheckBox(this); this.chkHaLum.text = ""; this.chkHaLum.checked = false;
   this.chkHaLum.onCheck = function(v) { self.p.nbHaLum = v; self.doRefresh(); };
   var haLumRow = new Sizer(false); haLumRow.spacing = 6;
   haLumRow.add(haLumLbl); haLumRow.add(this.chkHaLum); haLumRow.addStretch();

   gNarrow.sizer.add(palRow);
   gNarrow.sizer.add(this.slScnr);
   gNarrow.sizer.add(this.slOiiiBoost);
   gNarrow.sizer.add(this.slSiiBoost);
   gNarrow.sizer.add(this.slHaBlend);
   gNarrow.sizer.add(haLumRow);

   // ── Group 4 · Presets ────────────────────────────────────
   var gPresets = mkGroup("4 \u00B7 Presets");

   var presetNameLbl = new Label(this); presetNameLbl.text = "Name:"; presetNameLbl.minWidth = 50;
   var presetNameEdit = new Edit(this); presetNameEdit.minWidth = 150; presetNameEdit.text = "";
   var btnSavePreset = new PushButton(this); btnSavePreset.text = "\uD83D\uDCBE  Save";
   btnSavePreset.onClick = function() {
      var name = presetNameEdit.text.trim();
      if (!name) {
         (new MessageBox("Please enter a preset name.", "AstroMax", StdIcon_Information)).execute();
         return;
      }
      monoSavePreset(name, self.p);
      self.updatePresetCombo();
   };
   var saveRow = new Sizer(false); saveRow.spacing = 6;
   saveRow.add(presetNameLbl); saveRow.add(presetNameEdit);
   saveRow.addStretch(); saveRow.add(btnSavePreset);

   var presetLoadLbl = new Label(this); presetLoadLbl.text = "Saved:"; presetLoadLbl.minWidth = 50;
   this.presetCombo = new ComboBox(this); this.presetCombo.minWidth = 150;
   var btnLoadPreset = new PushButton(this); btnLoadPreset.text = "\uD83D\uDCC2  Load";
   var btnDelPreset  = new PushButton(this); btnDelPreset.text  = "\uD83D\uDDD1  Delete";

   btnLoadPreset.onClick = function() {
      var idx = self.presetCombo.currentItem - 1; if (idx < 0) return;
      var names = monoPresetNames(); if (idx >= names.length) return;
      var pp = monoLoadPreset(names[idx]);
      if (!pp) { (new MessageBox("Could not load preset.", "AstroMax", StdIcon_Error)).execute(); return; }
      if (pp.blackpoint  !== undefined) self.slBlackpoint.setValue(pp.blackpoint);
      if (pp.stretch     !== undefined) self.slStretch.setValue(pp.stretch);
      if (pp.contrast    !== undefined) self.slContrast.setValue(pp.contrast);
      if (pp.background  !== undefined) self.slBackground.setValue(pp.background);
      if (pp.midtones    !== undefined) self.slMidtones.setValue(pp.midtones);
      if (pp.highlights  !== undefined) self.slHighlights.setValue(pp.highlights);
      if (pp.saturation  !== undefined) self.slSaturation.setValue(pp.saturation);
      if (pp.starProtect !== undefined) self.slStarProtect.setValue(pp.starProtect);
      if (pp.skySmooth   !== undefined) self.slSkySmooth.setValue(pp.skySmooth);
      if (pp.nbPalette   !== undefined) {
         self.nbPalCmb.currentItem = pp.nbPalette; self.p.nbPalette = pp.nbPalette;
      }
      if (pp.nbScnr      !== undefined) self.slScnr.setValue(pp.nbScnr);
      if (pp.nbOiiiBoost !== undefined) self.slOiiiBoost.setValue(pp.nbOiiiBoost);
      if (pp.nbSiiBoost  !== undefined) self.slSiiBoost.setValue(pp.nbSiiBoost);
      if (pp.nbHaBlend   !== undefined) self.slHaBlend.setValue(pp.nbHaBlend);
      if (pp.nbHaLum !== undefined) {
         self.chkHaLum.checked = pp.nbHaLum; self.p.nbHaLum = pp.nbHaLum;
      }
      if (pp.composeMode !== undefined) self.p.composeMode = pp.composeMode;
      if (pp.nbMode !== undefined) {
         self.chkNB.checked = pp.nbMode; self.p.nbMode = pp.nbMode;
      }
      self.doRefresh();
   };
   btnDelPreset.onClick = function() {
      var idx = self.presetCombo.currentItem - 1; if (idx < 0) return;
      var names = monoPresetNames(); if (idx >= names.length) return;
      monoDeletePreset(names[idx]);
      self.updatePresetCombo();
   };

   var loadRow = new Sizer(false); loadRow.spacing = 6;
   loadRow.add(presetLoadLbl); loadRow.add(this.presetCombo);
   loadRow.addStretch(); loadRow.add(btnLoadPreset); loadRow.add(btnDelPreset);

   gPresets.sizer.add(saveRow);
   gPresets.sizer.add(loadRow);
   this.updatePresetCombo();

   // ── Action buttons ────────────────────────────────────────
   this.btnReset = new PushButton(this); this.btnReset.text = "\u21BA  Reset";
   this.btnReset.onClick = function() {
      self.slBlackpoint.setValue(0); self.slStretch.setValue(5);
      self.slContrast.setValue(0);   self.slBackground.setValue(0);
      self.slMidtones.setValue(0.5); self.slHighlights.setValue(0.5);
      self.slSaturation.setValue(1.0); self.slStarProtect.setValue(0);
      self.slSkySmooth.setValue(0);
      self.slScnr.setValue(0.0); self.slOiiiBoost.setValue(1.0);
      self.slSiiBoost.setValue(1.0); self.slHaBlend.setValue(0.0);
      self.chkHaLum.checked = false; self.p.nbHaLum = false;
      self.p.composeMode = 'nb';
      self.doRefresh();
   };

   this.btnApply = new PushButton(this); this.btnApply.text = "\u25B6  Apply & Continue";
   this.btnApply.toolTip = "Bake parameters and reset sliders for next stretch layer.";
   this.btnApply.onClick = function() {
      if (!self.origImg) return;
      self.previewImg = processImage(self.previewImg, self.p);
      self.origImg    = processImage(self.origImg,    self.p);
      self.appliedLayers++;
      self.slBlackpoint.setValue(0); self.slStretch.setValue(0);
      self.slContrast.setValue(0);   self.slBackground.setValue(0);
      self.slMidtones.setValue(0.5); self.slHighlights.setValue(0.5);
      self.slSaturation.setValue(1.0); self.slStarProtect.setValue(0);
      self.slSkySmooth.setValue(0);
      self.slScnr.setValue(0.0); self.slOiiiBoost.setValue(1.0);
      self.slSiiBoost.setValue(1.0); self.slHaBlend.setValue(0.0);
      self.chkHaLum.checked = false; self.p.nbHaLum = false;
      if (G_TMP && !G_TMP.isNull) { G_TMP.forceClose(); G_TMP = null; }
      ensureTmp(self.previewImg);
      self.windowTitle = "AstroMax Easy Stretch Mono v" + VERSION +
                         "  [layer " + self.appliedLayers + "]";
      self.doRefresh();
   };

   this.btnCreate = new PushButton(this); this.btnCreate.text = "\u2705  Create New Photo";
   this.btnCreate.onClick = function() {
      if (!self.origImg) { Console.criticalln("Prvo uradi Compose!"); return; }
      if (G_TMP && !G_TMP.isNull) { G_TMP.forceClose(); G_TMP = null; }
      ensureTmp(self.origImg);
      var res = processImage(self.origImg, self.p);
      var nid = "MonoCompose_AstroMax";
      var nw  = new ImageWindow(res.width, res.height, res.numberOfChannels,
                                res.bitsPerSample, res.isReal,
                                res.numberOfChannels > 1, nid);
      nw.mainView.beginProcess(0); nw.mainView.image.assign(res); nw.mainView.endProcess();
      nw.show(); nw.bringToFront();
      if (G_TMP && !G_TMP.isNull) { G_TMP.forceClose(); G_TMP = null; }
      ensureTmp(self.previewImg);
   };

   this.btnClose = new PushButton(this); this.btnClose.text = "Close";
   this.btnClose.onClick = function() {
      if (self.composedWin && !self.composedWin.isNull) self.composedWin.forceClose();
      if (G_TMP && !G_TMP.isNull) G_TMP.forceClose();
      self.cancel();
   };

   this.btnLicense = new PushButton(this); this.btnLicense.text = "\uD83D\uDD11  License";
   this.btnLicense.toolTip = "Show your HWID and activate license";
   this.btnLicense.onClick = function() { licShowActivationDialog(); };

   var btnRow = new Sizer(false); btnRow.spacing = 6;
   btnRow.add(this.btnLicense);
   btnRow.add(this.btnReset); btnRow.add(this.btnApply);
   btnRow.addStretch();
   btnRow.add(this.btnCreate); btnRow.add(this.btnClose);

   // ── Control panel ─────────────────────────────────────────
   var ctrlPanel = new Sizer(true); ctrlPanel.spacing = 8;
   ctrlPanel.add(zRow);
   ctrlPanel.add(gCompose);
   ctrlPanel.add(gStretch);
   ctrlPanel.add(gNarrow);
   ctrlPanel.add(gPresets);
   ctrlPanel.addStretch();
   ctrlPanel.add(btnRow);

   // ── Main layout ───────────────────────────────────────────
   var mainRow = new Sizer(false); mainRow.spacing = 8;
   mainRow.add(this.canvas, 100);
   mainRow.add(ctrlPanel, 0);

   this.sizer = new Sizer(true);
   this.sizer.margin = 8;
   this.sizer.add(mainRow);

   this.adjustToContents();
}

EasyStretchMonoDialog.prototype = new Dialog;

EasyStretchMonoDialog.prototype.updatePresetCombo = function() {
   this.presetCombo.clear();
   this.presetCombo.addItem("-- Select --");
   var names = monoPresetNames();
   for (var i = 0; i < names.length; i++) this.presetCombo.addItem(names[i]);
};

EasyStretchMonoDialog.prototype.updateLevelButtons = function() {
   this.btnZ2.enabled = this.zoomMode;
   this.btnZ4.enabled = this.zoomMode;
   this.btnZ8.enabled = this.zoomMode;
};

EasyStretchMonoDialog.prototype.renderPreview = function() {
   if (this.lastRes === null) return;
   this.previewBitmap = this.zoomMode
      ? renderZoom(this.lastRes, this.zoomCX, this.zoomCY, this.zoomLevel, this.PW, this.PH)
      : renderFull(this.lastRes, this.PW, this.PH);
   this.canvas.repaint();
};

EasyStretchMonoDialog.prototype.doRefresh = function() {
   if (this.busy || !this.previewImg) return;
   this.busy = true;
   try {
      this.lastRes = processImage(this.previewImg, this.p);
      this.renderPreview();
   } catch(e) { Console.writeln("Preview error: " + e); }
   this.busy = false;
};

function main() {
   // Clean up leftover temp windows from previous runs
   if (G_TMP && !G_TMP.isNull) { G_TMP.forceClose(); G_TMP = null; }
   var _ws = ImageWindow.windows;
   for (var _i = _ws.length - 1; _i >= 0; _i--) {
      var _w = _ws[_i];
      if (!_w.isNull && _w.mainView && !_w.mainView.isNull) {
         var _id = _w.mainView.id;
         if (_id === "AstroMaxTmp" || _id === "AstroMaxCompose" || _id === "_esm_tmp_" || _id === "_esm_rgb_") { _w.forceClose(); }
      }
   }
   Console.hide();
   var lic = licCheck();
   if (lic === "expired") {
      if (!licShowActivationDialog()) return;
   }
   var dlg = new EasyStretchMonoDialog();
   if (lic.indexOf("trial:") === 0) {
      var daysLeft = parseInt(lic.split(":")[1]);
      dlg.windowTitle = dlg.windowTitle + "  \u2022  Trial: " + daysLeft + " day" + (daysLeft !== 1 ? "s" : "") + " left";
   }
   dlg.execute();
}

main();

