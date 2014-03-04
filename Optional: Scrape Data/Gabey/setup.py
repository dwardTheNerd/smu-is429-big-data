import os
from setuptools import setup

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
  name = "gabey",
  version = "0.0.1",
  author = "Edward Tan",
  author_email = "edward.tan.2010@sis.smu.edu.sg",
  description = "A simple wrapper for Steam API",
  license = "BSD",
  packages = ['gabey'],
  long_description = read('README'),
  classifiers = [
    "Programming Language :: Python :: 2",
    "Programming Language :: Python:: 3",
    "License :: OSI Aapproved :: BSD License"
  ]
)