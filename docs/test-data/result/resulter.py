import os
import csv

result_dict = {}
csv_files = [f for f in os.listdir('.') if f.endswith('.csv')]

for filename in csv_files:
    with open(filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        next(csvreader)

        for row in csvreader:
            result_dict[row[0]] = [int(x) for x in row[1:]] if row[0] not in result_dict else [result_dict[row[0]][i] + int(row[i+1]) for i in range(4)]

with open('final.csv', 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['name', 'TP', 'TN', 'FP', 'FN'])

    for key, value in result_dict.items():
        csvwriter.writerow([key] + value)
