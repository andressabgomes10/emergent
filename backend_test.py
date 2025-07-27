import requests
import sys
from datetime import datetime
import json

class CajaTalksAPITester:
    def __init__(self, base_url="https://55aedf73-d153-4790-b009-09a508aa9700.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    print(f"   Response: {response.text}")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_hello_world(self):
        """Test GET /api/ endpoint"""
        return self.run_test(
            "Hello World Endpoint",
            "GET",
            "",
            200
        )

    def test_create_status_check(self, client_name):
        """Test POST /api/status endpoint"""
        return self.run_test(
            f"Create Status Check for '{client_name}'",
            "POST",
            "status",
            200,
            data={"client_name": client_name}
        )

    def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        return self.run_test(
            "Get All Status Checks",
            "GET",
            "status",
            200
        )

    def test_create_status_check_validation(self):
        """Test POST /api/status with invalid data"""
        return self.run_test(
            "Create Status Check - Invalid Data (missing client_name)",
            "POST",
            "status",
            422,  # FastAPI validation error
            data={}
        )

def main():
    print("🚀 Starting Cajá Talks API Tests")
    print("=" * 50)
    
    # Setup
    tester = CajaTalksAPITester()
    
    # Test 1: Hello World endpoint
    success, response = tester.test_hello_world()
    if not success:
        print("❌ Basic connectivity failed, stopping tests")
        return 1

    # Test 2: Get initial status checks (should work even if empty)
    success, initial_checks = tester.test_get_status_checks()
    if success:
        print(f"📊 Initial status checks count: {len(initial_checks) if isinstance(initial_checks, list) else 'Unknown'}")

    # Test 3: Create multiple status checks
    test_clients = [
        "Empresa ABC Ltda",
        "Tech Solutions Inc",
        "Consultoria XYZ"
    ]
    
    created_checks = []
    for client in test_clients:
        success, check_data = tester.test_create_status_check(client)
        if success and isinstance(check_data, dict):
            created_checks.append(check_data)

    # Test 4: Verify status checks were created
    success, final_checks = tester.test_get_status_checks()
    if success and isinstance(final_checks, list):
        print(f"📊 Final status checks count: {len(final_checks)}")
        
        # Verify our created checks are in the list
        created_client_names = [check.get('client_name') for check in created_checks]
        found_clients = [check.get('client_name') for check in final_checks if check.get('client_name') in created_client_names]
        
        print(f"✅ Found {len(found_clients)} of {len(created_client_names)} created clients in the list")
        for client in found_clients:
            print(f"   - {client}")

    # Test 5: Validation test
    tester.test_create_status_check_validation()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())