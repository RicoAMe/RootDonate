CB — local chat with memory and online lookup
=============================================

What you need
-------------
Python 3.8 or newer. No extra packages.

Windows
-------
1. Put cleverbot_chat.py and run_cb.bat in the same folder.
2. Double-click run_cb.bat
   or open Command Prompt in that folder and type:
      py -3 cleverbot_chat.py

If Python is missing, install it from https://www.python.org/downloads/
and tick "Add python.exe to PATH".

Mac / Linux
-----------
    python3 cleverbot_chat.py

Test the internet path
----------------------
    py -3 cleverbot_chat.py --check
    python3 cleverbot_chat.py --check

Commands while chatting
-----------------------
    help
    nodes                 list saved facts
    remember <text>       store a note
    forget <text>         delete matching notes
    online                show lookup status
    online on / online off
    bye

Talk normally. Names, places, work and likes are saved automatically.
Factual questions are looked up online (DuckDuckGo, then Wikipedia),
phrased as a short professional reply, and kept for later.

Files created beside the script
-------------------------------
    cb_memory_nodes.json    saved facts and lookups
    cb_chat_log.txt         conversation log
