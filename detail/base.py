import os
import tempfile

from django.core.files.storage import FileSystemStorage


def temporary_file(excel_file):
    fs = FileSystemStorage(tempfile.gettempdir())
    if excel_file.name.endswith('.xlsx'):
        file_name = fs.save(content=excel_file, name='data.xlsx')
    else:
        file_name = fs.save(content=excel_file, name='data.csv')
    full_path = os.path.join(fs.location, file_name)

    return full_path