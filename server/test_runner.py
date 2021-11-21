import unittest
from tests import test_contact_us
from importlib import import_module

import argparse


def configure_options():
    parser = argparse.ArgumentParser()
    parser.add_argument("--module", nargs=2, default=[0, 0])
    return parser


def get_server_tests(suite):
    suite.addTest(unittest.makeSuite(test_contact_us.TestContactUs))


def main():
    suite = unittest.TestSuite()
    options = configure_options().parse_args()

    if value := options.module[0]:
        module = import_module(value)
        test_class = getattr(module, options.module[1])
        suite.addTest(unittest.makeSuite(test_class))

    else:
        get_server_tests(suite)

    output = unittest.TextTestRunner(verbosity=2).run(suite)
    if output.errors or output.failures:
        print("Failing Tests")


if __name__ == "__main__":
    main()
