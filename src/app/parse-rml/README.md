# Test scripten uitvoeren:
cd ~/Documents/ThesisSerendipity/src/app/parse-rml/test_yarrrml/
parser.js -i test_rules.yml -o test_rules.rml.ttl
java -jar ~/Downloads/rmlmapper-6.1.3-r367-all.jar -m test_rules.rml.ttl -o test_output.ttl

# Zelf gemaakte scripten uitvoeren:
cd ~/Documents/ThesisSerendipity/src/app/parse-rml/do_yarrrml/
parser.js -i rules.yml -o rules.rml.ttl
java -jar ~/Downloads/rmlmapper-6.1.3-r367-all.jar -m rules.rml.ttl -o output.json -s jsonld