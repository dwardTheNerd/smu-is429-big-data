#!/bin/sh

hadoop fs -copyToLocal $1/csv-serde-0.9.1.jar $HADOOP_HOME/lib/
