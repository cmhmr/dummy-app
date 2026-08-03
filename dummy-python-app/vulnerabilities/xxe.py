from lxml import etree

def parse_xml(xml):
    # Vulnerable: XXE enabled
    parser = etree.XMLParser(resolve_entities=True)
    try:
        root = etree.fromstring(xml, parser)
        return root.text
    except Exception as e:
        return str(e)
