"""
Public Tunnel Engine for Tejas AI Systems
Creates an instant, 100% free HTTPS tunnel to localhost:5000 using standard SSH
Automatically registers the public URL into the Tejas CRM database!
"""
import subprocess
import re
import sys
import time
from database import set_setting

def start_tunnel():
    print("=" * 60)
    print("  TEJAS AI SYSTEMS - INSTANT PUBLIC TUNNEL")
    print("  Creating secure public HTTPS link for your Tirupati demos...")
    print("=" * 60)
    
    cmd = ["ssh", "-o", "StrictHostKeyChecking=no", "-o", "ServerAliveInterval=30", "-p", "443", "-R0:localhost:5000", "a.pinggy.io"]
    
    try:
        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            stdin=subprocess.PIPE,
            text=True,
            bufsize=1
        )
        
        tunnel_url = None
        print("\nConnecting to secure gateway...")
        
        for line in proc.stdout:
            # Look for https://...pinggy.link or similar URL pattern
            match = re.search(r'(https://[a-zA-Z0-9\.\-]+\.pinggy\.(?:link|io))', line)
            if match:
                tunnel_url = match.group(1)
                break
            # Also check for general https:// URLs
            match2 = re.search(r'(https://[a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+)', line)
            if match2 and "pinggy" in match2.group(1):
                tunnel_url = match2.group(1)
                break
                
        if tunnel_url:
            print("\n" + "🎉 " * 15)
            print(f"\n[LIVE SUCCESS] Your Public HTTPS Demo URL is:\n\n👉  {tunnel_url}\n")
            print("Auto-saving this public URL into your Tejas CRM database...")
            set_setting("public_base_url", tunnel_url)
            print("Done! All WhatsApp pitches will now use this real HTTPS link!")
            print("Doctors and builders can now open your prototypes from anywhere.")
            print("\n" + "🎉 " * 15)
            print("\nKeep this window OPEN while sharing demos with clients.")
            print("Press Ctrl+C to stop the tunnel when done.\n")
            
            # Keep alive
            try:
                while proc.poll() is None:
                    time.sleep(1)
            except KeyboardInterrupt:
                print("\nStopping tunnel...")
                proc.terminate()
        else:
            print("Could not auto-detect URL from tunnel output.")
            
    except Exception as e:
        print("Tunnel failed to start:", e)

if __name__ == "__main__":
    start_tunnel()
