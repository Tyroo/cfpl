from setuptools import setup, find_packages

# 加载项目说明书
with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

# 运行打包操作
setup(
    name="CFPL",  # Replace with your own username
    version ="1.0.0",
    author="Zhangjialiang",
    author_email="519272478@qq.com",
    description="A Django app to conduct Web-based CFPL.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    classifiers=[
        "Environment:: Web Environment"
        "Framework:: Django"
        "Framework:: Django:: X.Y"  # Replace "X.Y" as appropriate
        "Intended Audience:: Developers"
        "License:: OSI"
        "Approved:: BSD License"
        "Operating System:: OS Independent"
        "Programming Language:: Python"
        "Programming Language:: Python:: 3"
        "Programming Language:: Python:: 3:: Only"
        "Programming Language:: Python:: 3.6"
        "Programming Language:: Python:: 3.7"
        "Programming Language:: Python:: 3.8"
        "Topic:: Internet:: WWW / HTTPS"
        "Topic:: Internet:: WWW / HTTPS:: Dynamic Content"
    ],
    packages=find_packages(),
    data_files=[('.app/static/css', ['.app/static/css/*.css']),
                ('.app/static/js', ['.app/static/js/*']),
                ('.app/static/img', ['.app/static/img/*.png','.app/static/img/*.jpg','.app/static/img/*.gif', '.app/static/img/*.ico','.app/static/img/*.bmp']),
                ('.app/certificate',['.app/certificate/*.crt', '.app/certificate/*.key']),
                ('.app/filter',['app/filter/*.py']),
                ('.app/templates',['app/templates/*.html']),
                ('.', ['LICENSE', '*.sqlite3', 'manage.py', '*.txt'])],
    python_requires='>=3.6',
    include_package_data=True
)
