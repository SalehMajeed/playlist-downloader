import youtube_dl

playlist_url = "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jx2TTZk3IGWKSbtugYdrlu"

def get_playlist_info(playlist_url):
    ydl_opts = {
        'quiet': True,
        'extract_flat': True,
        'force_generic_extractor': True,
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        playlist_info = ydl.extract_info(playlist_url, download=False)
        return playlist_info
    
def print_playlist_info(playlist_info):
    for index, each_entry in enumerate(playlist_info["entries"], start=1):
        print(f"{each_entry['title']}")
        print(f"{index}")
   
playlist_info = get_playlist_info(playlist_url)
print_playlist_info(playlist_info)