 #!/usr/bin/python

from boto.s3.connection import S3Connection

def main():
  conn = S3Connection('AKIAJRDVC2GH57F3ELEQ', 'YO5kMT7wJacmkII9gbwzA0hJeiIT+mr/yi986t0P')
  bucket = conn.get_bucket('smu-is429-steam')
  for k in bucket.list('output/'):
  	if k.name == 'output/':
  		continue
  	filename = k.name.split('/')[1]
  	k.get_contents_to_filename('./results/%s.csv' % filename)

if __name__ == "__main__":
  main()