 #!/usr/bin/python

from boto.s3.connection import S3Connection

def main():
  # Please add your own aws access key and secret key
  conn = S3Connection('<your aws access key>', '<your aws secret key>')
  
  # Insert the name of the S3 bucket you created for tutorial
  bucket = conn.get_bucket('<your-s3-bucket>')
  for k in bucket.list('output/'):
  	if k.name == 'output/':
  		continue
  	filename = k.name.split('/')[1]
  	k.get_contents_to_filename('./results/%s.csv' % filename)

if __name__ == "__main__":
  main()