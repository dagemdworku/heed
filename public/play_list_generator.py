import json
from os import walk

from mutagen.mp3 import MP3

path = "books/foundation"


def get_all_file_names(path):
    return next(walk(path), (None, None, []))[2]


def filter_txt_file_names(file_names, extension):
    filtered_files = []
    for file_name in file_names:
        if file_name.endswith(extension):
            filtered_files.append(file_name)
    filtered_files.sort()
    return filtered_files, len(filtered_files)


def generate_chapter(index, name_prefix, name_suffix, txt_file_name, mp3_file_name, json_file_name):
    id = json_file_name.replace(".json", "")
    name = open(path + "/" + txt_file_name).readline().rstrip()
    duration = MP3(path + "/" + mp3_file_name).info.length

    if "chapter" not in name.lower():
        name = "Chapter One"

    chapter = {}

    chapter['id'] = id
    chapter['index'] = index
    chapter['name'] = name_prefix + name + name_suffix
    chapter['duration'] = duration
    chapter['audio'] = path + "/" + mp3_file_name
    chapter['book'] = path + "/" + json_file_name

    return chapter


def generate_playlist():
    print("[INFO]", "Loading files...")
    file_names = get_all_file_names(path)

    txt_file_names, txt_file_names_length = filter_txt_file_names(
        file_names, ".txt")
    print("[INFO]", txt_file_names_length, "TXT files loaded")
    mp3_file_names, mp3_file_names_length = filter_txt_file_names(
        file_names, ".mp3")
    print("[INFO]", mp3_file_names_length, "MP3 files loaded")
    json_file_names, json_file_names_length = filter_txt_file_names(
        file_names, ".json")
    print("[INFO]", json_file_names_length, "JSON files loaded")

    if txt_file_names_length == mp3_file_names_length and mp3_file_names_length == json_file_names_length:
        play_list = {}

        play_list['name'] = "Foundation"
        play_list['author'] = "Isaac Asimov"
        play_list['published'] = "1951"
        play_list['artwork'] = path + "/" + "cover.jpeg"

        chapters = []

        for index in range(0, txt_file_names_length):
            name_prefix = ""
            if (index < 8):
                name_prefix = "Part I  - "
            elif (index < 15):
                name_prefix = "Part II - "
            elif (index < 24):
                name_prefix = "Part III - "
            elif (index < 30):
                name_prefix = "Part IV - "
            else:
                name_prefix = "Part V - "

            chapters.append(generate_chapter(
                index, name_prefix, "", txt_file_names[index],  mp3_file_names[index], json_file_names[index]))

        play_list['chapters'] = chapters

        json.dumps(play_list)

        play_list_file = open("play_list.json", "w")
        play_list_file.write(json.dumps(play_list))
        play_list_file.close()

        print("[INFO]", "Finished!")

    else:
        print("[EROR]", "Mismatch files")


generate_playlist()
