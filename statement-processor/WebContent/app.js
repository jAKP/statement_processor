var app = angular.module('statmentApp', []);

app.controller("statementCtrl", function($scope, $http) {

            $scope.trigger_calc = function() {
                $http.get('records.csv').success($scope.processCsv);
                $http.get('records.xml').success($scope.processXml);
            };

            $scope.processCsv = function(file) {
                var reader = new FileReader();
                var blob = new Blob([file]);
                var data = "", records = [], duplicate = [], uniq_values = [];
                reader.onload = function() {
                    var csv_lines = reader.result.split(/\r\n|\n/);
                    var header = csv_lines[0].split(',');
                    $scope.header = header;
                    records.push(header);
                    for (i in csv_lines) {
                        var item = csv_lines[i].split(',');
                        if (item.length == header.length) {
                            if (uniq_values.indexOf(item[0]) == -1 && convert(convert(item[3]) + convert(item[4])) == convert(item[5])) {
                                uniq_values.push(item[0]);
                                records.push(item);
                            } else {
                                duplicate.push(item);
                            }
                        }
                    }

                    $scope.$apply(function() {
                        $scope.csv_items = records;
                        $scope.csv_errors = duplicate;
                    });
                }
                reader.readAsText(blob, 'ISO-8859-1');
            };

            $scope.processXml = function(file) {
                var x2js = new X2JS();
                var data = x2js.xml_str2json(file);
                var records = [], duplicate = [], uniq_values = [];
                var xml_lines = data.records.record;
                var numRecords = xml_lines.length;
                var header = $scope.header;
                records.push(header);
                duplicate.push(header);
                for (i in xml_lines) {
                    if (uniq_values.indexOf(xml_lines[i]._reference) == -1 &&
                        convert(convert(xml_lines[i].startBalance) + convert(xml_lines[i].mutation)) == convert(xml_lines[i].endBalance)) {
                        uniq_values.push(xml_lines[i]._reference);
                        records.push(getrecord(xml_lines[i]));
                    } else {
                        duplicate.push(getrecord(xml_lines[i]));
                    }
                }
                $scope.xml_items = records;
                $scope.xml_errors = duplicate;
            }
        });