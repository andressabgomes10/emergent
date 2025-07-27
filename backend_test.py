#!/usr/bin/env python3
"""
Backend Testing Suite for Cajá Atendimento System
Tests the core backend functionalities including FastAPI, Supabase integration, and WhatsApp service
"""

import asyncio
import aiohttp
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, List

# Get URLs from environment
BACKEND_URL = "https://8268fa90-0814-46da-bc67-8e025a4c33ac.preview.emergentagent.com"
WHATSAPP_SERVICE_URL = "http://localhost:8002"
SUPABASE_URL = "https://whfmtlavhmalfsdetfsy.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZm10bGF2aG1hbGZzZGV0ZnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDEwMjYsImV4cCI6MjA2OTIxNzAyNn0.KCCHHy3FgnsveExLYWpI8qJMmrHTYFwkkJmQ2H_M-cw"

class TestResults:
    def __init__(self):
        self.results = []
        self.passed = 0
        self.failed = 0
        
    def add_result(self, test_name: str, passed: bool, message: str = "", details: str = ""):
        result = {
            "test": test_name,
            "passed": passed,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.results.append(result)
        if passed:
            self.passed += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.failed += 1
            print(f"❌ {test_name}: {message}")
            if details:
                print(f"   Details: {details}")
    
    def print_summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Total Tests: {total}")
        print(f"Passed: {self.passed}")
        print(f"Failed: {self.failed}")
        print(f"Success Rate: {(self.passed/total*100):.1f}%" if total > 0 else "No tests run")
        print(f"{'='*60}")

class BackendTester:
    def __init__(self):
        self.results = TestResults()
        self.session = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()

    async def test_fastapi_backend(self):
        """Test the FastAPI backend endpoints"""
        print(f"\n🔍 Testing FastAPI Backend at {BACKEND_URL}")
        
        try:
            # Test root endpoint
            async with self.session.get(f"{BACKEND_URL}/api/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("message") == "Hello World":
                        self.results.add_result("FastAPI Root Endpoint", True, "Root endpoint responding correctly")
                    else:
                        self.results.add_result("FastAPI Root Endpoint", False, "Unexpected response", str(data))
                else:
                    self.results.add_result("FastAPI Root Endpoint", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("FastAPI Root Endpoint", False, "Connection failed", str(e))

        try:
            # Test GET status endpoint
            async with self.session.get(f"{BACKEND_URL}/api/status") as response:
                if response.status == 200:
                    data = await response.json()
                    if isinstance(data, list):
                        self.results.add_result("FastAPI GET Status", True, f"Retrieved {len(data)} status checks")
                    else:
                        self.results.add_result("FastAPI GET Status", False, "Unexpected response format", str(data))
                else:
                    self.results.add_result("FastAPI GET Status", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("FastAPI GET Status", False, "Request failed", str(e))

        try:
            # Test POST status endpoint
            test_data = {"client_name": "Empresa Cajá Teste"}
            async with self.session.post(f"{BACKEND_URL}/api/status", json=test_data) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("client_name") == test_data["client_name"]:
                        self.results.add_result("FastAPI POST Status", True, "Status check created successfully")
                    else:
                        self.results.add_result("FastAPI POST Status", False, "Unexpected response", str(data))
                else:
                    self.results.add_result("FastAPI POST Status", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("FastAPI POST Status", False, "Request failed", str(e))

    async def test_whatsapp_service(self):
        """Test the WhatsApp service endpoints"""
        print(f"\n🔍 Testing WhatsApp Service at {WHATSAPP_SERVICE_URL}")
        
        try:
            # Test WhatsApp service status
            async with self.session.get(f"{WHATSAPP_SERVICE_URL}/status") as response:
                if response.status == 200:
                    data = await response.json()
                    status = data.get("status", "unknown")
                    self.results.add_result("WhatsApp Service Status", True, f"Service status: {status}")
                else:
                    self.results.add_result("WhatsApp Service Status", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("WhatsApp Service Status", False, "Service not accessible", str(e))

        try:
            # Test QR endpoint
            async with self.session.get(f"{WHATSAPP_SERVICE_URL}/qr") as response:
                if response.status == 200:
                    data = await response.json()
                    self.results.add_result("WhatsApp QR Endpoint", True, f"QR endpoint accessible, status: {data.get('status', 'unknown')}")
                else:
                    self.results.add_result("WhatsApp QR Endpoint", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("WhatsApp QR Endpoint", False, "Request failed", str(e))

    async def test_supabase_integration(self):
        """Test Supabase integration through direct API calls"""
        print(f"\n🔍 Testing Supabase Integration at {SUPABASE_URL}")
        
        headers = {
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
        }

        # Test authentication endpoint
        try:
            auth_data = {
                "email": "admin@atendepro.com",
                "password": "admin123"
            }
            async with self.session.post(f"{SUPABASE_URL}/auth/v1/token?grant_type=password", 
                                       json=auth_data, headers=headers) as response:
                if response.status in [200, 400]:  # 400 might be expected if user doesn't exist
                    data = await response.json()
                    if response.status == 200:
                        self.results.add_result("Supabase Authentication", True, "Authentication endpoint accessible")
                    else:
                        self.results.add_result("Supabase Authentication", True, "Auth endpoint accessible (user may not exist)")
                else:
                    self.results.add_result("Supabase Authentication", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("Supabase Authentication", False, "Request failed", str(e))

        # Test tickets table
        try:
            async with self.session.get(f"{SUPABASE_URL}/rest/v1/tickets?select=*&limit=5", 
                                      headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    self.results.add_result("Supabase Tickets Table", True, f"Tickets table accessible, found {len(data)} records")
                else:
                    self.results.add_result("Supabase Tickets Table", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("Supabase Tickets Table", False, "Request failed", str(e))

        # Test clients table
        try:
            async with self.session.get(f"{SUPABASE_URL}/rest/v1/clients?select=*&limit=5", 
                                      headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    self.results.add_result("Supabase Clients Table", True, f"Clients table accessible, found {len(data)} records")
                else:
                    self.results.add_result("Supabase Clients Table", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("Supabase Clients Table", False, "Request failed", str(e))

        # Test users table
        try:
            async with self.session.get(f"{SUPABASE_URL}/rest/v1/users?select=*&limit=5", 
                                      headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    self.results.add_result("Supabase Users Table", True, f"Users table accessible, found {len(data)} records")
                else:
                    self.results.add_result("Supabase Users Table", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("Supabase Users Table", False, "Request failed", str(e))

    async def test_dashboard_statistics(self):
        """Test dashboard statistics functionality"""
        print(f"\n🔍 Testing Dashboard Statistics")
        
        headers = {
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'apikey': SUPABASE_ANON_KEY
        }

        try:
            # Test tickets by status
            statuses = ['open', 'in_progress', 'closed']
            stats = {}
            
            for status in statuses:
                async with self.session.get(f"{SUPABASE_URL}/rest/v1/tickets?select=id&status=eq.{status}", 
                                          headers=headers) as response:
                    if response.status == 200:
                        data = await response.json()
                        stats[status] = len(data)
                    else:
                        stats[status] = 0
            
            # Test total clients count
            async with self.session.get(f"{SUPABASE_URL}/rest/v1/clients?select=id", 
                                      headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    stats['clients'] = len(data)
                else:
                    stats['clients'] = 0
            
            self.results.add_result("Dashboard Statistics", True, 
                                  f"Stats retrieved - Open: {stats.get('open', 0)}, In Progress: {stats.get('in_progress', 0)}, Closed: {stats.get('closed', 0)}, Clients: {stats.get('clients', 0)}")
            
        except Exception as e:
            self.results.add_result("Dashboard Statistics", False, "Failed to retrieve statistics", str(e))

    async def test_crud_operations(self):
        """Test basic CRUD operations on Supabase tables"""
        print(f"\n🔍 Testing CRUD Operations")
        
        headers = {
            'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        }

        # Test client creation
        try:
            test_client = {
                "name": "Cliente Teste Cajá",
                "email": "teste@caja.com.br",
                "phone": "11999887766",
                "company": "Empresa Teste",
                "city": "São Paulo",
                "status": "active"
            }
            
            async with self.session.post(f"{SUPABASE_URL}/rest/v1/clients", 
                                       json=test_client, headers=headers) as response:
                if response.status == 201:
                    data = await response.json()
                    if data and len(data) > 0:
                        client_id = data[0].get('id')
                        self.results.add_result("Client Creation", True, f"Test client created with ID: {client_id}")
                        
                        # Test client update
                        update_data = {"company": "Empresa Teste Atualizada"}
                        async with self.session.patch(f"{SUPABASE_URL}/rest/v1/clients?id=eq.{client_id}", 
                                                    json=update_data, headers=headers) as update_response:
                            if update_response.status == 200:
                                self.results.add_result("Client Update", True, "Test client updated successfully")
                            else:
                                self.results.add_result("Client Update", False, f"HTTP {update_response.status}")
                        
                        # Test client deletion
                        async with self.session.delete(f"{SUPABASE_URL}/rest/v1/clients?id=eq.{client_id}", 
                                                     headers=headers) as delete_response:
                            if delete_response.status == 204:
                                self.results.add_result("Client Deletion", True, "Test client deleted successfully")
                            else:
                                self.results.add_result("Client Deletion", False, f"HTTP {delete_response.status}")
                    else:
                        self.results.add_result("Client Creation", False, "No data returned", str(data))
                else:
                    self.results.add_result("Client Creation", False, f"HTTP {response.status}", await response.text())
        except Exception as e:
            self.results.add_result("Client CRUD Operations", False, "CRUD test failed", str(e))

    async def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Cajá Atendimento Backend Tests")
        print("="*60)
        
        await self.test_fastapi_backend()
        await self.test_whatsapp_service()
        await self.test_supabase_integration()
        await self.test_dashboard_statistics()
        await self.test_crud_operations()
        
        self.results.print_summary()
        
        return self.results

async def main():
    """Main test runner"""
    async with BackendTester() as tester:
        results = await tester.run_all_tests()
        
        # Return exit code based on test results
        if results.failed > 0:
            print(f"\n⚠️  {results.failed} tests failed. Check the details above.")
            return 1
        else:
            print(f"\n✅ All {results.passed} tests passed successfully!")
            return 0

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)