import pickle

def deserialize_object(data):
    # Vulnerable: Insecure deserialization
    try:
        obj = pickle.loads(data)
        return str(obj)
    except Exception as e:
        return str(e)
