package com.arabesk.tv;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import java.security.MessageDigest;

/** Arabesk TV for Android phones, tablets, Android TV and Fire TV: the same app as the web version, full screen. */
public class MainActivity extends Activity {
    private WebView web;
    private FrameLayout root;
    private View fullView;
    private WebChromeClient.CustomViewCallback fullCb;
    private boolean showingError = false;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(5, 2, 3));
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(5, 2, 3));
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);
        hideBars();

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setTextZoom(100);
        s.setSupportMultipleWindows(false);
        s.setJavaScriptCanOpenWindowsAutomatically(true);
        if (Build.VERSION.SDK_INT >= 21) s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        s.setUserAgentString(s.getUserAgentString() + " ArabeskAndroid/" + BuildConfig.VERSION_NAME);
        CookieManager.getInstance().setAcceptCookie(true);
        if (Build.VERSION.SDK_INT >= 21) CookieManager.getInstance().setAcceptThirdPartyCookies(web, true);
        web.setFocusable(true);
        web.setFocusableInTouchMode(true);
        web.requestFocus();
        web.addJavascriptInterface(new Bridge(), "ArabeskAndroid");

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest req) {
                return openOutside(req.getUrl());
            }
            @SuppressWarnings("deprecation")
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, String url) {
                return openOutside(Uri.parse(url));
            }
            @Override
            public void onReceivedError(WebView v, WebResourceRequest req, WebResourceError err) {
                if (Build.VERSION.SDK_INT >= 21 && req.isForMainFrame()) showError();
            }
            @SuppressWarnings("deprecation")
            @Override
            public void onReceivedError(WebView v, int code, String desc, String url) {
                if (Build.VERSION.SDK_INT < 23) showError();
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback cb) {
                if (fullView != null) { cb.onCustomViewHidden(); return; }
                fullView = view; fullCb = cb;
                root.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                web.setVisibility(View.GONE);
                hideBars();
            }
            @Override
            public void onHideCustomView() { leaveFull(); }
        });

        if (savedInstanceState != null) web.restoreState(savedInstanceState);
        else web.loadUrl(BuildConfig.APP_URL);
    }

    /** phone calls, WhatsApp and other sites open in their own apps; our app stays inside. */
    private boolean openOutside(Uri u) {
        String host = u.getHost() == null ? "" : u.getHost();
        String app = Uri.parse(BuildConfig.APP_URL).getHost();
        String scheme = u.getScheme() == null ? "" : u.getScheme();
        if ((scheme.equals("http") || scheme.equals("https")) && host.equals(app)) return false;
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, u));
        } catch (ActivityNotFoundException e) {
            // nothing on this device can open it (for example a TV with no phone app)
        }
        return true;
    }

    private void showError() {
        showingError = true;
        String html = "<html><head><meta name='viewport' content='width=device-width,initial-scale=1'></head>"
            + "<body style='margin:0;background:#050203;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center'>"
            + "<div><div style='font-size:46px'>📡</div><h2 style='margin:10px 0'>No internet connection</h2>"
            + "<p style='color:#bbb' dir='rtl'>مفيش اتصال بالإنترنت. اتأكد من النت ودوس إعادة المحاولة.</p>"
            + "<button autofocus onclick='location.href=\"retry://\"' style='margin-top:14px;padding:14px 34px;font-size:18px;font-weight:800;border:0;border-radius:14px;background:#D32436;color:#fff'>Retry · إعادة المحاولة</button>"
            + "</div></body></html>";
        web.loadDataWithBaseURL("about:blank", html, "text/html", "utf-8", null);
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, String url) {
                if (url.startsWith("retry:")) { recreate(); return true; }
                return false;
            }
        });
    }

    private void leaveFull() {
        if (fullView == null) return;
        root.removeView(fullView);
        fullView = null;
        if (fullCb != null) fullCb.onCustomViewHidden();
        fullCb = null;
        web.setVisibility(View.VISIBLE);
        web.requestFocus();
        hideBars();
    }

    private void hideBars() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideBars();
    }

    @Override
    public void onBackPressed() {
        if (fullView != null) { leaveFull(); return; }
        if (showingError) { super.onBackPressed(); return; }
        // ask the app first: it closes the player / menus / goes back; "false" means we are on the home screen
        web.evaluateJavascript("(window.__androidBack ? window.__androidBack() : false)", v -> {
            if (!"true".equals(v)) finish();
        });
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent e) {
        // TV remotes: the Back button and the media keys
        if (e.getKeyCode() == KeyEvent.KEYCODE_BACK && e.getAction() == KeyEvent.ACTION_UP) { onBackPressed(); return true; }
        if (e.getKeyCode() == KeyEvent.KEYCODE_BACK) return true;
        return super.dispatchKeyEvent(e);
    }

    @Override protected void onPause() { super.onPause(); web.onPause(); }
    @Override protected void onResume() { super.onResume(); web.onResume(); hideBars(); }
    @Override protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }
    @Override protected void onDestroy() { if (web != null) { web.destroy(); } super.onDestroy(); }

    /** Gives the web app a fixed id for this device so its activation code never changes, even after reinstalling. */
    private class Bridge {
        @JavascriptInterface
        public String deviceId() {
            try {
                String aid = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
                if (aid == null) aid = Build.FINGERPRINT;
                byte[] h = MessageDigest.getInstance("SHA-256").digest(("arabesk-tv:" + aid + ":" + Build.MANUFACTURER + Build.MODEL).getBytes("UTF-8"));
                StringBuilder sb = new StringBuilder();
                for (byte b : h) sb.append(String.format("%02x", b));
                return sb.toString();
            } catch (Exception e) {
                return "";
            }
        }
        @JavascriptInterface
        public String version() { return BuildConfig.VERSION_NAME; }
    }
}
